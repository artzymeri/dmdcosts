import AdminBallinaGrids from "@/components/admin/Ballina/AdminBallinaGrids";
import {observer} from "mobx-react-lite";

const AdminBallinaContent = () => {
    return (
        <div className="admin-ballina-content-container">
            <h2>
                Ballina
            </h2>
            <AdminBallinaGrids />
        </div>
    )
}

export default observer(AdminBallinaContent);