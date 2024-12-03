import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { observer } from "mobx-react-lite";

const {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} = require("@mui/material");

const AdminAddCaseForm = (props) => {
  const { presenter } = props;

  return (
    <div className="admin-add-client-form-container">
      <FormControl>
        <InputLabel
          sx={{ padding: "0px 5px", background: "white" }}
          id="client-select"
        >
          Clients
        </InputLabel>
        <Select
          labelId="client-select"
          variant="outlined"
          value={presenter?.vm?.newCaseObject?.client_id || ""}
          onChange={presenter.handleClientChange}
          focused={
            presenter?.vm?.newCaseObject?.client_id
              ? true.toString()
              : false.toString()
          }
        >
          {presenter?.clientsList &&
            presenter?.clientsList.map((client) => {
              return (
                <MenuItem key={client?.id} value={client?.id}>
                  {client?.business_name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel
          sx={{ padding: "0px 5px", background: "white" }}
          id="employee-select"
        >
          Assignee
        </InputLabel>
        <Select
          labelId="employee-select"
          variant="outlined"
          value={presenter?.vm?.newCaseObject?.assignee_id || ""}
          onChange={presenter.handleAssigneeChange}
          focused={
            presenter?.vm?.newCaseObject?.assignee_id
              ? true.toString()
              : false.toString()
          }
        >
          {presenter?.employeesList &&
            presenter?.employeesList.map((employee) => {
              return (
                <MenuItem key={employee?.id} value={employee?.id}>
                  {employee?.name_surname}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <TextField
        label="Reference Number"
        onChange={(e) => {
          presenter.handleChangeValues("reference_number", e?.target?.value);
        }}
        value={presenter.vm?.newCaseObject?.reference_number || ""}
        focused={presenter.vm?.newCaseObject?.reference_number ? true : false}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          value={presenter.vm?.newCaseObject?.last_offer_date}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => {
                presenter.handleDateChange(null);
              },
            },
          }}
          label="Last Offer Date"
          format={"DD/MM/YYYY"}
          onChange={(newValue) => {
            presenter.handleDateChange(newValue);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default observer(AdminAddCaseForm);
