import { Button, FormControl, NativeSelect, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { DeleteOutlineRounded } from "@mui/icons-material";

const AdminEmployeesHeader = ({ presenter }) => {
  return (
    <div className="admin-employees-header-container">
      <TextField
        placeholder="Kërko"
        id="filled-hidden-label-small"
        variant="standard"
        size="small"
        fullWidth
        autoComplete={"off"}
        onChange={(e) => {
          presenter.handleSearchFiltering(e);
        }}
      />
      <FormControl sx={{ width: "150px" }} variant="filled">
        <NativeSelect
          variant="filled"
          defaultValue={"username"}
          onChange={(e) => {
            presenter.handleSortingOptions(e);
          }}
        >
          <option value={"username"}>Username</option>
          <option value={"name_surname"}>Name&Surname</option>
          <option value={"email_address"}>Email Address</option>
          <option value={"role"}>Role</option>
        </NativeSelect>
      </FormControl>
      <FormControl sx={{ width: "150px" }} variant="filled">
        <NativeSelect
          variant="filled"
          defaultValue={"a-z"}
          onChange={(e) => {
            presenter.handleSortingMode(e);
          }}
        >
          <option value={"a-z"}>A-Z</option>
          <option value={"z-a"}>Z-A</option>
        </NativeSelect>
      </FormControl>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          presenter.handleDeleteEmployeesModal(true);
        }}
        disabled={presenter?.deleteButtonDisabled}
      >
        <DeleteOutlineRounded />
      </Button>
    </div>
  );
};

export default observer(AdminEmployeesHeader);
