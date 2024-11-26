import {observer} from "mobx-react-lite";
import AdminCasesDeletionDialog from "@/components/admin/Cases/Cases/AdminCasesDeletionDialog";
import AdminCasesListItem from "@/components/admin/Cases/Cases/AdminCasesListItem";

const AdminCasesList = ({presenter}) => {


    return (
        <>
            <AdminCasesDeletionDialog presenter={presenter}/>
            <div className="admin-cases-list-container">
                {presenter?.allOrders.map((item) => {
                    return (<AdminCasesListItem presenter={presenter} key={item?.id}
                                                   item={item}/>)
                })}
                {presenter.allOrders.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>No Data</span>}
            </div>
        </>
    )
}

export default observer(AdminCasesList);