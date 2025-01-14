import { observer } from "mobx-react-lite";
import AdminCaseTitle from "@/components/admin/Cases/Case/AdminCaseTitle";
import { Alert, Snackbar } from "@mui/material";
import EmployeeCaseDetailsLeftSide from "./EmployeeCaseDetailsLeftSide";
import EmployeeCaseDetailsRightSide from "./EmployeeCaseDetailsRightSide";

const EmployeeCaseView = ({ presenter }) => {
  return (
    <div className="admin-case-content-container">
      <AdminCaseTitle presenter={presenter} />
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
        <EmployeeCaseDetailsLeftSide presenter={presenter} />
        <div className="admin-case-details-middle"></div>
        <EmployeeCaseDetailsRightSide presenter={presenter} />
      </div>
    </div>
  );
};

export default observer(EmployeeCaseView);
