import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { observer } from "mobx-react-lite";
import AdminCaseStatusBanner from "@/components/admin/Cases/Case/AdminCaseStatusBanner";

const EmployeeCaseDetailsRightSide = ({ presenter }) => {
  const customStatusText = (case_status) => {
    if (case_status == "checked") {
      return "Serve";
    }
    if (case_status == "served") {
      return "Settle";
    }
    if (case_status == "settled") {
      return "Mark as Paid";
    }
  };

  const changeCaseStatus = (case_status) => {
    if (case_status == "checked") {
      if (presenter.caseDetails.negotiable) {
        presenter.setAddOfferModal(true, "sent");
      } else {
        presenter.changeCaseStatus(presenter.caseDetails.id, "served");
      }
    }
    if (case_status == "served") {
      presenter.changeCaseStatus(presenter.caseDetails.id, "settled");
    }
    if (case_status == "settled") {
      presenter.changeCaseStatus(presenter.caseDetails.id, "paid");
    }
  };

  return (
    <div className="admin-case-details-right-side">
      <div className="admin-case-details-status-container">
        <span style={{ fontWeight: "bold" }}>Case Status:</span>
        <AdminCaseStatusBanner status={presenter.caseDetails?.status} />
      </div>
      {(presenter.caseDetails.status == "to-draft" ||
        presenter.caseDetails.status == "to-amend") && (
        <div
          style={{
            display: "grid",
            gap: "10px",
            width: "100%",
            gridTemplateColumns: "1fr",
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel
              sx={{ padding: "0px 5px", background: "white" }}
              id="status-select"
            >
              Change Case Status
            </InputLabel>
            <Select
              size="small"
              labelId="status-select"
              variant="outlined"
              onChange={(event) => {
                presenter.handleCaseStatusChange(event).then((res) => {
                  if (res) {
                    presenter.setSnackbar(true, res.data);
                  }
                });
              }}
            >
              {presenter?.vm?.status_options &&
                presenter?.vm?.status_options.map((option) => {
                  if (option.value !== presenter.caseDetails?.status) {
                    return (
                      <MenuItem key={option?.id} value={option?.value}>
                        {option?.title}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default observer(EmployeeCaseDetailsRightSide);
