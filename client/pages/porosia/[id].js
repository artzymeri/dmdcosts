import {useRouter} from 'next/router';
import dynamic from "next/dynamic";
import {getTokenType} from "@/utils/auth";
import {useEffect, useState} from "react";
import Head from "next/head";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import UserHeader from "@/components/user/Header/UserHeader";
import UserPorosiaView from "@/components/user/Porosite/Porosia/UserPorosiaView";
import {observer} from "mobx-react-lite";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import Cookies from "js-cookie";
import {CircularProgress} from "@mui/material";
import {WarningOutlined} from "@mui/icons-material";
import AdminPorosiaView from "@/components/admin/Porosite/Porosia/AdminPorosiaView";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), { ssr: false });
const UserHOC = dynamic(() => import("@/components/user/userHOC"), { ssr: false });

const PorosiaPage = () => {
    const token = getTokenType();
    const router = useRouter();
    const {id} = router.query;
    const [loading, setLoading] = useState(true);
    const [successfulLoad, setSuccessfulLoad] = useState(false);
    const [presenter, setPresenter] = useState(null);

    useEffect(() => {
        if (!token) {
            router.push('/kycu')
            return;
        }

        if (token === 'admin') {
            setPresenter(container.get(TYPES.AdminPorosiaPresenter));
        } else if (token === 'user') {
            setPresenter(container.get(TYPES.UserPorosiaPresenter));
        }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            if (presenter && id) {
                setLoading(true);
                try {
                    if (token === 'user') {
                        const userData = JSON.parse(Cookies.get('userData'));
                        await presenter.getOrderDetails(userData?.id, parseInt(id));
                        if (presenter.orderDetails?.title !== "error" && presenter.orderDetails !== undefined && presenter.orderDetails?.title !== null) {
                            setSuccessfulLoad(true);
                        }
                    } else if (token === 'admin') {
                        await presenter.getOrderDetailsAsAdmin(parseInt(id));
                        if (presenter.orderDetails?.title !== "error" && presenter.orderDetails) {
                            setSuccessfulLoad(true);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching order details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id, presenter?.vm?.refresh_state]);

    return (
        <>
            {token === 'admin' && (<>
                <Head>
                    <title>{`Porosia #${id}`}</title>
                </Head>
                <AdminHOC>
                    <AdminHeader/>
                    {loading && (<div className="backdrop-container">
                        <CircularProgress/>
                    </div>)}
                    {!loading && successfulLoad && (<AdminPorosiaView presenter={presenter}/>)}
                    {!loading && !successfulLoad && (<div className="user-porosia-content-container">
                        <div className="no-access-order-view">
                            <WarningOutlined/>
                            <span>
                                Diçka nuk është në rregull!
                            </span>
                        </div>
                    </div>)}
                </AdminHOC>
            </>)}
            {token === 'user' && (<>
                <Head>
                    <title>{`Porosia #${id}`}</title>
                </Head>
                <UserHOC>
                    <UserHeader/>
                    {loading && (<div className="backdrop-container">
                        <CircularProgress/>
                    </div>)}
                    {!loading && successfulLoad && (<UserPorosiaView presenter={presenter}/>)}
                    {!loading && !successfulLoad && (<div className="user-porosia-content-container">
                        <div className="no-access-order-view">
                            <WarningOutlined/>
                            <span>
                                Diçka nuk është në rregull!
                            </span>
                        </div>
                    </div>)}
                </UserHOC>
            </>)}
        </>
    );
};

export default observer(PorosiaPage);
