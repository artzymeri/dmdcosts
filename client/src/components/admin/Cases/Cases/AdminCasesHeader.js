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
      <FormControl
        className="remove-mobile"
        sx={{ width: "250px" }}
        variant="filled"
      >
        <NativeSelect
          variant="filled"
          defaultValue={"any"}
          onChange={(e) => {
            presenter.handleSortingMode(e);
          }}
        >
          <option value={"any"}>Any</option>
          <option value={"to-draft"}>To Draft</option>
          <option value={"drafted"}>Drafted</option>
          <option value={"done"}>Done</option>
        </NativeSelect>
      </FormControl>
      <Button
        className="remove-mobile"
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
