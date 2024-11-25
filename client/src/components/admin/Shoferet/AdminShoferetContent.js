import {useEffect} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import AdminShoferetHeader from "@/components/admin/Shoferet/AdminShoferetHeader";
import AdminShoferetList from "@/components/admin/Shoferet/AdminShoferetList";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

const AdminShoferetContent = () => {

    let presenter = container.get(TYPES.AdminShoferetPresenter);

    const router = useRouter();

    useEffect(() => {
        presenter.getDriversData()
    }, []);


    return (
        <div className="admin-shoferet-content-container">
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>
                    Shoferët
                </h2>
                <Button variant="contained" onClick={() => {router.push('/shtoshofer')}}>
                    Shto Shofer
                </Button>
            </div>
            <AdminShoferetHeader presenter={presenter}/>
            <AdminShoferetList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminShoferetContent);