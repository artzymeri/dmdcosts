import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";

const AddEmployeeForm = (props) => {
  const { presenter } = props;

  return (
    <div className="admin-add-employee-form-container">
      <TextField
        label="Name Surname"
        onChange={(e) => {
          presenter.handleChangeValues("name_surname", e?.target?.value);
        }}
        value={presenter.vm?.newEmployeeObject?.name_surname || ""}
        focused={presenter.vm?.newEmployeeObject?.name_surname ? true : false}
      />
      <TextField
        label="Username"
        onChange={(e) => {
          presenter.handleChangeValues("username", e?.target?.value);
        }}
        value={presenter.vm?.newEmployeeObject?.username || ""}
        focused={presenter.vm?.newEmployeeObject?.username ? true : false}
      />
      <TextField
        label="Email Address"
        onChange={(e) => {
          presenter.handleChangeValues("email_address", e?.target?.value);
        }}
        value={presenter.vm?.newEmployeeObject?.email_address || ""}
        focused={presenter.vm?.newEmployeeObject?.email_address ? true : false}
      />
      <TextField
        label="Password"
        type="password"
        onChange={(e) => {
          presenter.handleChangeValues("password", e?.target?.value);
        }}
        value={presenter.vm?.newEmployeeObject?.password || ""}
        focused={presenter.vm?.newEmployeeObject?.password ? true : false}
      />
      <FormControl>
        <InputLabel
          sx={{ padding: "0px 5px", background: "white" }}
          id="role-select"
        >
          Role
        </InputLabel>
        <Select
          labelId="role-select"
          variant="outlined"
          onChange={presenter.handleRoleChange}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"employee"}>Employee</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Bank Account Holder"
        onChange={(e) => {
          presenter.handleChangeBankDetails("account_holder", e?.target?.value);
        }}
        value={
          presenter.vm?.newEmployeeObject?.bank_details?.account_holder || ""
        }
        focused={
          presenter.vm?.newEmployeeObject?.bank_details?.account_holder
            ? true
            : false
        }
      />
      <TextField
        label="Bank Account Number"
        onChange={(e) => {
          presenter.handleChangeBankDetails("account_number", e?.target?.value);
        }}
        value={
          presenter.vm?.newEmployeeObject?.bank_details?.account_number || ""
        }
        focused={
          presenter.vm?.newEmployeeObject?.bank_details?.account_number
            ? true
            : false
        }
      />
      <TextField
        label="Bank Name"
        onChange={(e) => {
          presenter.handleChangeBankDetails("bank_name", e?.target?.value);
        }}
        value={presenter.vm?.newEmployeeObject?.bank_details?.bank_name || ""}
        focused={
          presenter.vm?.newEmployeeObject?.bank_details?.bank_name
            ? true
            : false
        }
      />
    </div>
  );
};

export default observer(AddEmployeeForm);
