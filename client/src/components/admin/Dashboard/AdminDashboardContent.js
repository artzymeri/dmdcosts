import AdminDashboardGrids from "@/components/admin/Dashboard/AdminDashboardGrids";
import {observer} from "mobx-react-lite";

const AdminDashboardContent = () => {
    return (
        <div className="admin-dashboard-content-container">
            <h2>
                Dashboard
            </h2>
            <AdminDashboardGrids />
        </div>
    )
}

export default observer(AdminDashboardContent);