import {observer} from "mobx-react-lite";
import AdminCaseTitle from "@/components/admin/Cases/Case/AdminCaseTitle";
import AdminCaseDetailsLeftSide from "@/components/admin/Cases/Case/AdminCaseDetailsLeftSide";
import AdminCaseDetailsRightSide from "@/components/admin/Cases/Case/AdminCaseDetailsRightSide";
import {Alert, Snackbar} from "@mui/material";
import AdminCaseViewDeletionModal from "@/components/admin/Cases/Case/AdminCaseViewDeletionModal";

const AdminCaseView = ({presenter}) => {

    return (
        <div className="admin-case-content-container">
            <AdminCaseTitle presenter={presenter}/>
            <div className="admin-case-details-container">
                <Snackbar open={presenter?.snackbarBoolean} autoHideDuration={3000}>
                    <Alert
                        severity={presenter?.snackbarDetails?.title}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {presenter?.snackbarDetails?.message}
                    </Alert>
                </Snackbar>
                <AdminCaseViewDeletionModal presenter={presenter} />
                <AdminCaseDetailsLeftSide presenter={presenter}/>
                <div className="admin-case-details-middle"></div>
                <AdminCaseDetailsRightSide presenter={presenter}/>
            </div>
        </div>
    );
};

export default observer(AdminCaseView);
