import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { observer } from "mobx-react-lite";

const AdminCaseCheckedModal = ({ presenter }) => {
  return (
    <Dialog
      open={presenter?.checkedStatusModal}
      onBackdropClick={() => {
        presenter.setCheckedCaseStatusModal(false);
      }}
    >
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            value={presenter.vm?.checked_date}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  presenter.handleCheckedCaseDate(null);
                },
              },
            }}
            label="Date Checked:"
            format={"DD/MM/YYYY"}
            onChange={(newValue) => {
              presenter.handleCheckedCaseDate(newValue);
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            presenter.setCheckedCaseStatusModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            presenter.confirmCheckCase();
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AdminCaseCheckedModal);
