import { observer } from "mobx-react-lite";
import AdminCaseTitle from "@/components/admin/Cases/Case/AdminCaseTitle";
import AdminCaseDetailsLeftSide from "@/components/admin/Cases/Case/AdminCaseDetailsLeftSide";
import AdminCaseDetailsRightSide from "@/components/admin/Cases/Case/AdminCaseDetailsRightSide";
import { Alert, Snackbar } from "@mui/material";
import AdminCaseViewDeletionModal from "@/components/admin/Cases/Case/AdminCaseViewDeletionModal";
import AdminCaseDetailsAddOfferModal from "./AdminCaseDetailsAddOfferModal";
import AdminCaseCheckedModal from "./AdminCaseCheckedModal";
import AdminCaseSettledModal from "./AdminCaseSettledModal";

const AdminCaseView = ({ presenter }) => {
  return (
    <div className="admin-case-content-container">
      <AdminCaseTitle presenter={presenter} />
      <div
        className={
          presenter.leftSideOpen
            ? "admin-case-details-container"
            : "admin-case-details-container-default"
        }
      >
        <Snackbar open={presenter?.snackbarBoolean} autoHideDuration={3000}>
          <Alert
            severity={presenter?.snackbarDetails?.title}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {presenter?.snackbarDetails?.message}
          </Alert>
        </Snackbar>
        <AdminCaseDetailsAddOfferModal presenter={presenter} />
        <AdminCaseViewDeletionModal presenter={presenter} />
        <AdminCaseCheckedModal presenter={presenter} />
        <AdminCaseSettledModal presenter={presenter} />
        {presenter.leftSideOpen && (
          <AdminCaseDetailsLeftSide presenter={presenter} />
        )}
        {presenter.leftSideOpen && (
          <div className="admin-case-details-middle"></div>
        )}
        <AdminCaseDetailsRightSide presenter={presenter} />
      </div>
    </div>
  );
};

export default observer(AdminCaseView);
