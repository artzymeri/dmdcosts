import {observer} from "mobx-react-lite";
import AdminPorosiaTitle from "@/components/admin/Porosite/Porosia/AdminPorosiaTitle";
import AdminPorosiaDetailsLeftSide from "@/components/admin/Porosite/Porosia/AdminPorosiaDetailsLeftSide";
import AdminPorosiaDetailsRightSide from "@/components/admin/Porosite/Porosia/AdminPorosiaDetailsRightSide";

const AdminPorosiaView = ({presenter}) => {

    return (
        <div className="admin-porosia-content-container">
            <AdminPorosiaTitle presenter={presenter}/>
            <div className="admin-porosia-details-container">
                <AdminPorosiaDetailsLeftSide presenter={presenter}/>
                <div className="admin-porosia-details-middle"></div>
                <AdminPorosiaDetailsRightSide presenter={presenter}/>
            </div>
        </div>
    );
};

export default observer(AdminPorosiaView);
