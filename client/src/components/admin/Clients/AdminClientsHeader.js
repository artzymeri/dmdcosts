import { Button, FormControl, NativeSelect, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { DeleteOutlineRounded } from "@mui/icons-material";

const AdminClientsHeader = ({ presenter }) => {
  return (
    <div className="admin-clients-header-container" style={{ height: "86px" }}>
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
      <FormControl
        sx={{ width: "250px" }}
        variant="filled"
        className="remove-mobile"
      >
        <NativeSelect
          variant="filled"
          defaultValue={"business_name"}
          onChange={(e) => {
            presenter.handleSortingOptions(e);
          }}
        >
          <option value={"business_name"}>Firm Name</option>
          <option value={"address"}>Address</option>
          <option value={"email_address"}>Email Address</option>
        </NativeSelect>
      </FormControl>
      <FormControl
        sx={{ width: "250px" }}
        variant="filled"
        className="remove-mobile"
      >
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
        className="remove-mobile"
        variant="contained"
        size="large"
        color="error"
        onClick={() => {
          presenter.handleDeleteClientsModal(true);
        }}
        disabled={presenter?.deleteButtonDisabled}
      >
        <DeleteOutlineRounded />
      </Button>
    </div>
  );
};

export default observer(AdminClientsHeader);
