import {useEffect, useState} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import AdminKlientetHeader from "@/components/admin/Klientet/AdminKlientetHeader";
import AdminKlientetList from "@/components/admin/Klientet/AdminKlientetList";
import {observer} from "mobx-react-lite";

const AdminKlientetContent = () => {

    let presenter = container.get(TYPES.AdminKlientetPresenter);

    useEffect(() => {
        presenter.getKlientetData()
    },[]);


    return (
        <div className="admin-klientet-content-container">
            <h2>
                Klientët
            </h2>
            <AdminKlientetHeader presenter={presenter}/>
            <AdminKlientetList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminKlientetContent);