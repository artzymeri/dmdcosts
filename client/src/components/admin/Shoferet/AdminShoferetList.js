import {observer} from "mobx-react-lite";
import AdminShoferetDeletionDialog from "@/components/admin/Shoferet/AdminShoferetDeletionDialog";
import AdminShoferetListItem from "@/components/admin/Shoferet/AdminShoferetListItem";

const AdminShoferetList = ({presenter}) => {

    return (
        <>
            <AdminShoferetDeletionDialog presenter={presenter}/>
            <div className="admin-shoferet-list-container">
                {presenter?.driversData.map((item) => {
                    return (<AdminShoferetListItem presenter={presenter} key={item?.id}
                                                   item={item}/>)
                })}
                {presenter.driversData.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>}
            </div>
        </>
    )
}

export default observer(AdminShoferetList);