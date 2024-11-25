import {observer} from "mobx-react-lite";
import {useEffect, useMemo} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import AdminPorositeHeader from "@/components/admin/Porosite/Porosite/AdminPorositeHeader";
import AdminPorositeList from "@/components/admin/Porosite/Porosite/AdminPorositeList";
import AdminSecondHeader from "@/components/admin/Porosite/Porosite/AdminPorositeSecondHeader";


const AdminPorositeContent = () => {

    const presenter = useMemo(() => container.get(TYPES.AdminPorositePresenter), []);

    useEffect(() => {
        presenter.getAllOrders();
    },[]);

    return (
        <div className="admin-porosite-content-container">
            <div className="admin-porosite-content-title-container">
                <h2>
                    Porositë
                </h2>
            </div>
            <AdminPorositeHeader presenter={presenter}/>
            <AdminSecondHeader presenter={presenter}/>
            <AdminPorositeList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminPorositeContent);