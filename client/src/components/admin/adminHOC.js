import AdminSidebar from "@/components/admin/AdminSidebar";
import {observer} from "mobx-react-lite";

const adminHOC = ({children}) => {
    return (
        <div className="admin-layout-parent">
            <AdminSidebar/>
            <div className="admin-layout-content">
                {children}
            </div>
        </div>
    )
}

export default observer(adminHOC);