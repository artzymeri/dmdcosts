import {observer} from "mobx-react-lite";
import AdminShoferetDeletionDialog from "@/components/admin/Shoferet/AdminShoferetDeletionDialog";
import AdminAutomjetetListItem from "@/components/admin/Automjetet/AdminAutomjetetListItem";

const AdminTransportiList = ({presenter}) => {

    return (
        <>
            <AdminShoferetDeletionDialog presenter={presenter}/>
            <div className="admin-automjetet-list-container">
                {presenter?.automjetetData.map((item) => {
                    return (<AdminAutomjetetListItem presenter={presenter} key={item?.id}
                                                     transport={item}/>)
                })}
                {presenter.automjetetData.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>}
            </div>
        </>
    )
}

export default observer(AdminTransportiList);