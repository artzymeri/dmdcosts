import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import UserHeader from "@/components/user/Header/UserHeader";
import {observer} from "mobx-react-lite";
import AdminPorositeContent from "@/components/admin/Porosite/Porosite/AdminPorositeContent";
import UserPorositeContent from "@/components/user/Porosite/Porosite/UserPorositeContent";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);

const UserHOC = dynamic(
    () => import("@/components/user/userHOC"),
    {
        ssr: false,
    }
);

const PorositePage = () => {
    const token = getTokenType();
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/kycu')
        }
    },[]);
    return (
        <>
            {
                token === 'admin' && (
                    <>
                        <Head>
                            <title>Porositë</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <AdminPorositeContent />
                        </AdminHOC>
                    </>
                )
            }
            {
                token === 'user' && (
                    <>
                        <Head>
                            <title>Porositë</title>
                        </Head>
                        <UserHOC>
                            <UserHeader/>
                            <UserPorositeContent />
                        </UserHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(PorositePage);