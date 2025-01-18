import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const AdminCaseDetailsLeftSide = ({ presenter }) => {
  const details = [
    {
      label: "Client Firm Name:",
      value: presenter.caseClient?.business_name || null,
    },
    {
      label: "Employee Assigned:",
      value: presenter.assignedEmployee?.name_surname || null,
    },
    {
      label: "Date Created:",
      value: presenter.caseDetails?.createdAt
        ? dayjs(presenter.caseDetails.createdAt).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Date Instructed:",
      value: presenter.caseDetails?.date_instructed
        ? dayjs(presenter.caseDetails.date_instructed).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Date Checked:",
      value: presenter.caseDetails?.checked_date
        ? dayjs(presenter.caseDetails.checked_date).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Date Settled:",
      value: presenter.caseDetails?.settled_date
        ? dayjs(presenter.caseDetails.settled_date).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "POD due date:",
      value: presenter.caseDetails?.pod_due_date
        ? dayjs(presenter.caseDetails.pod_due_date).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Negotiable:",
      value: presenter.caseDetails?.negotiable ? "Yes" : null,
    },
    {
      label: "Claimant Name:",
      value: presenter.caseDetails?.claimant_name || null,
    },
    {
      label: "Client Reference Number:",
      value: presenter.caseDetails?.client_reference_number || null,
    },
    {
      label: "Defendant Name:",
      value: presenter.caseDetails?.defendant_name || null,
    },
    {
      label: "Defendant Reference Number:",
      value: presenter.caseDetails?.defendant_reference_number || null,
    },
    {
      label: "Defendant Email:",
      value: presenter.caseDetails?.defendant_email || null,
    },
    {
      label: "DMD Rate:",
      value: presenter.caseDetails?.rate_per_hour || null,
    },
  ];

  return (
    <div className="admin-case-details-left-side">
      <span className="admin-case-details-left-side-title">Case Details:</span>
      {!presenter.vm.edit_view &&
        details.map(({ label, value, className = "" }, index) => {
          if (!value) return null;

          return (
            <div
              key={index}
              className={`admin-case-details-left-side-row ${className}`}
              style={index === 0 ? { marginTop: "10px" } : undefined}
            >
              <span className="admin-case-details-left-side-label">
                {label}
              </span>
              <span className="admin-case-details-left-side-info">{value}</span>
            </div>
          );
        })}
      {presenter.vm.edit_view && (
        <>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Client Firm Name:
            </span>
            <FormControl size="small" sx={{ width: "350px" }}>
              <InputLabel
                sx={{ padding: "0px 5px", background: "white" }}
                id="client-select"
              >
                Client Firm Name:
              </InputLabel>
              <Select
                size="small"
                labelId="client-select"
                variant="outlined"
                value={presenter.vm.editable_case_fields.client_id}
                onChange={(event) => {
                  presenter.handleClientEditChange(event);
                }}
              >
                {presenter?.vm?.clients_list &&
                  presenter?.vm?.clients_list.map((client) => {
                    return (
                      <MenuItem key={client?.id} value={client?.id}>
                        {client?.business_name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Employee Assigned:
            </span>
            <FormControl size="small" sx={{ width: "350px" }}>
              <InputLabel
                sx={{ padding: "0px 5px", background: "white" }}
                id="employee-select"
              >
                Employee Assigned:
              </InputLabel>
              <Select
                size="small"
                labelId="employee-select"
                variant="outlined"
                value={presenter.vm.editable_case_fields.assignee_id}
                onChange={(event) => {
                  presenter.handleEmployeeEditChange(event);
                }}
              >
                {presenter?.vm?.employees_list &&
                  presenter?.vm?.employees_list.map((employee) => {
                    return (
                      <MenuItem key={employee?.id} value={employee?.id}>
                        {employee?.name_surname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Case Type:
            </span>
            <FormControl size="small" sx={{ width: "350px" }}>
              <InputLabel
                sx={{ padding: "0px 5px", background: "white" }}
                id="type-select"
              >
                Type Of Case
              </InputLabel>
              <Select
                labelId="type-select"
                variant="outlined"
                value={presenter?.vm?.editable_case_fields?.type}
                onChange={presenter.handleTypeEditChange}
                focused={
                  presenter?.vm?.editable_case_fields?.type
                    ? true.toString()
                    : false.toString()
                }
              >
                <MenuItem value={"MOD"}>MOD</MenuItem>
                <MenuItem value={"ID"}>ID</MenuItem>
                <MenuItem value={"HDR"}>HDR</MenuItem>
                <MenuItem value={"PI"}>PI</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Date Instructed:
            </span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "350px" }}
                value={dayjs(
                  presenter.vm?.editable_case_fields?.date_instructed
                )}
                slotProps={{
                  field: {
                    clearable: true,
                    onClear: () => {
                      presenter.handleDateInstructedChange(null);
                    },
                  },
                }}
                label="Date Instructed"
                format={"DD/MM/YYYY"}
                onChange={(newValue) => {
                  presenter.handleDateInstructedChange(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          {presenter.vm.editable_case_fields.checked_date && (
            <div
              className={`admin-case-details-left-side-row`}
              style={{
                justifyContent: "space-between",
              }}
            >
              <span className="admin-case-details-left-side-label">
                Date Checked:
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "350px" }}
                  value={dayjs(
                    presenter.vm?.editable_case_fields?.checked_date
                  )}
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => {
                        presenter.handleDateCheckedChange(null);
                      },
                    },
                  }}
                  label="Date Checked"
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => {
                    presenter.handleDateCheckedChange(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          )}
          {presenter.vm.editable_case_fields.settled_date && (
            <div
              className={`admin-case-details-left-side-row`}
              style={{
                justifyContent: "space-between",
              }}
            >
              <span className="admin-case-details-left-side-label">
                Date Settled:
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "350px" }}
                  value={dayjs(
                    presenter.vm?.editable_case_fields?.settled_date
                  )}
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => {
                        presenter.handleDateSettledChange(null);
                      },
                    },
                  }}
                  label="Date Settled"
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => {
                    presenter.handleDateSettledChange(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          )}
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Negotiable:
            </span>
            <FormControlLabel
              control={
                <Switch
                  checked={presenter.vm?.editable_case_fields?.negotiable}
                  onChange={presenter.handleNegotiableChange}
                />
              }
            />
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Claimant Name:
            </span>
            <TextField
              size="small"
              value={presenter?.vm?.editable_case_fields?.claimant_name}
              onChange={(e) => {
                presenter.changeEditTextDetails(
                  e.target.value,
                  "claimant_name"
                );
              }}
            />
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Client Reference Number:
            </span>
            <TextField
              size="small"
              value={
                presenter?.vm?.editable_case_fields?.client_reference_number
              }
              onChange={(e) => {
                presenter.changeEditTextDetails(
                  e.target.value,
                  "client_reference_number"
                );
              }}
            />
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Defendant Name:
            </span>
            <TextField
              size="small"
              value={presenter?.vm?.editable_case_fields?.defendant_name}
              onChange={(e) => {
                presenter.changeEditTextDetails(
                  e.target.value,
                  "defendant_name"
                );
              }}
            />
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Defendant Reference Number:
            </span>
            <TextField
              size="small"
              value={
                presenter?.vm?.editable_case_fields?.defendant_reference_number
              }
              onChange={(e) => {
                presenter.changeEditTextDetails(
                  e.target.value,
                  "defendant_reference_number"
                );
              }}
            />
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              Defendant Email:
            </span>
            <TextField
              size="small"
              value={presenter?.vm?.editable_case_fields?.defendant_email}
              onChange={(e) => {
                presenter.changeEditTextDetails(
                  e.target.value,
                  "defendant_email"
                );
              }}
            />
          </div>
          <div
            className={`admin-case-details-left-side-row`}
            style={{
              justifyContent: "space-between",
            }}
          >
            <span className="admin-case-details-left-side-label">
              DMD Rate:
            </span>
            <TextField
              size="small"
              value={presenter?.vm?.editable_case_fields?.rate_per_hour}
              onChange={(e) => {
                presenter.changeEditTextDetails(
                  e.target.value,
                  "rate_per_hour"
                );
              }}
            />
          </div>
        </>
      )}
      {presenter.vm.edit_view ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              presenter.switchEditView();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              presenter.saveEditValues();
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          className="remove-mobile"
          onClick={() => {
            presenter.switchEditView();
          }}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default observer(AdminCaseDetailsLeftSide);
