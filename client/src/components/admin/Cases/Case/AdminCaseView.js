import {observer} from "mobx-react-lite";
import AdminCaseTitle from "@/components/admin/Cases/Case/AdminCaseTitle";
import AdminCaseDetailsLeftSide from "@/components/admin/Cases/Case/AdminCaseDetailsLeftSide";
import AdminCaseDetailsRightSide from "@/components/admin/Cases/Case/AdminCaseDetailsRightSide";

const AdminCaseView = ({presenter}) => {

    return (
        <div className="admin-porosia-content-container">
            <AdminCaseTitle presenter={presenter}/>
            <div className="admin-porosia-details-container">
                <AdminCaseDetailsLeftSide presenter={presenter}/>
                <div className="admin-porosia-details-middle"></div>
                <AdminCaseDetailsRightSide presenter={presenter}/>
            </div>
        </div>
    );
};

export default observer(AdminCaseView);
