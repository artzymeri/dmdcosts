import { Button, FormControl, NativeSelect, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { DeleteOutlineRounded } from "@mui/icons-material";

const AdminCasesHeader = ({ presenter }) => {
  return (
    <div className="admin-cases-header-container" style={{ height: "86px" }}>
      <TextField
        placeholder="Search"
        id="filled-hidden-label-small"
        variant="standard"
        size="small"
        fullWidth
        autoComplete={"off"}
        clearable={true}
        onChange={(e) => {
          presenter.handleSearchFiltering(e);
        }}
      />
      <FormControl sx={{ width: "275px" }} variant="filled">
        <NativeSelect
          variant="filled"
          defaultValue={"reference_number"}
          onChange={(e) => {
            presenter.handleSortingOptions(e);
          }}
        >
          <option value={"reference_number"}>Reference Number</option>
          <option value={"client_business_name"}>Client Firm Name</option>
          <option value={"assignee_name_surname"}>Assignee Name Surname</option>
        </NativeSelect>
      </FormControl>
      <FormControl sx={{ width: "250px" }} variant="filled">
        <NativeSelect
          variant="filled"
          defaultValue={"any"}
          onChange={(e) => {
            presenter.handleSortingMode(e);
          }}
        >
          <option value={"any"}>Any</option>
          <option value={"to-do"}>To Do</option>
          <option value={"to-fix"}>To Fix</option>
          <option value={"done"}>Done</option>
        </NativeSelect>
      </FormControl>
      <Button
        variant="contained"
        size="large"
        color="error"
        onClick={() => {
          presenter.handleDeleteCasesModal(true);
        }}
        disabled={presenter?.deleteButtonDisabled}
      >
        <DeleteOutlineRounded />
      </Button>
    </div>
  );
};

export default observer(AdminCasesHeader);
