import {observer} from "mobx-react-lite";
import AdminKlientetListItem from "@/components/admin/Klientet/AdminKlientetListItem";
import AdminKlientDeletionDialog from "@/components/admin/Klientet/AdminKlientDeletionDialog";

const AdminKlientetList = ({presenter}) => {


    return (
        <>
            <AdminKlientDeletionDialog presenter={presenter}/>
            <div className="admin-klientet-list-container">
                {presenter?.klientetData.map((item) => {
                    return (<AdminKlientetListItem presenter={presenter} key={item?.id}
                                                   item={item}/>)
                })}
                {presenter.klientetData.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>}
            </div>
        </>
    )
}

export default observer(AdminKlientetList);