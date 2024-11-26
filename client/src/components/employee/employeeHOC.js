import UserSidebar from "@/components/employee/EmployeeSidebar";
import {observer} from "mobx-react-lite";

const employeeHOC = ({children}) => {
    return (
        <div className="employee-layout-parent">
            <UserSidebar />
            <div className="employee-layout-content">
                {children}
            </div>
        </div>
    )
}

export default observer(employeeHOC);