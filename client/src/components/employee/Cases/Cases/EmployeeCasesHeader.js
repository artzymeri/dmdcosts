import { FormControl, NativeSelect, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

const EmployeeCasesHeader = ({ presenter }) => {
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
          <option value={"claimant_name"}>Claimant Name</option>
          <option value={"client_reference_number"}>
            Claimant Reference Number
          </option>
          <option value={"defendant_name"}>Defendant Name</option>
          <option value={"defendant_reference_number"}>
            Defendant Reference Number
          </option>
          <option value={"defendant_email"}>Defendant Email</option>
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
          <option value={"to-draft"}>To Draft</option>
          <option value={"drafted"}>Drafted</option>
          <option value={"done"}>Done</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default observer(EmployeeCasesHeader);
