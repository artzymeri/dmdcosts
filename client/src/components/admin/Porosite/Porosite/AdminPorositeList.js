import {observer} from "mobx-react-lite";
import AdminPorositeDeletionDialog from "@/components/admin/Porosite/Porosite/AdminPorositeDeletionDialog";
import AdminPorositeListItem from "@/components/admin/Porosite/Porosite/AdminPorositeListItem";

const AdminPorositeList = ({presenter}) => {


    return (
        <>
            <AdminPorositeDeletionDialog presenter={presenter}/>
            <div className="admin-porosite-list-container">
                {presenter?.allOrders.map((item) => {
                    return (<AdminPorositeListItem presenter={presenter} key={item?.id}
                                                   item={item}/>)
                })}
                {presenter.allOrders.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>}
            </div>
        </>
    )
}

export default observer(AdminPorositeList);