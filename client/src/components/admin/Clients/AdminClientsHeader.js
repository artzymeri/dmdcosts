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
      <FormControl sx={{ width: "250px" }} variant="filled">
        <NativeSelect
          variant="filled"
          defaultValue={"receiver_name_surname"}
          onChange={(e) => {
            presenter.handleSortingOptions(e);
          }}
        >
          <option value={"receiver_name_surname"}>Emri Mbiemri</option>
          <option value={"receiver_phone_number"}>Nr. Telefonit</option>
          <option value={"receiver_city"}>Qyteti</option>
          <option value={"receiver_state"}>Shteti</option>
          <option value={"receiver_full_address"}>Adresa</option>
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
          <option value={"any"}>Çdo status</option>
          <option value={"request"}>Kërkesë</option>
          <option value={"cancelled"}>Anuluar</option>
        </NativeSelect>
      </FormControl>
      <Button
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
