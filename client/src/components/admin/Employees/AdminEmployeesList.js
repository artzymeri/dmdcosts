import {observer} from "mobx-react-lite";
import AdminEmployeeDeletionDialog from "@/components/admin/Employees/AdminEmployeeDeletionDialog";
import AdminEmployeesListItem from "@/components/admin/Employees/AdminEmployeesListItem";

const AdminEmployeesList = ({presenter}) => {

    return (
        <>
            <AdminEmployeeDeletionDialog presenter={presenter}/>
            <div className="admin-employees-list-container">
                {presenter?.employeesData.map((item) => {
                    return (<AdminEmployeesListItem presenter={presenter} key={item?.id}
                                                   item={item}/>)
                })}
                {presenter.employeesData.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>No Data</span>}
            </div>
        </>
    )
}

export default observer(AdminEmployeesList);