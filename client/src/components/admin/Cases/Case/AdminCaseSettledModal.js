import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { observer } from "mobx-react-lite";

const AdminCaseSettledModal = ({ presenter }) => {
  return (
    <Dialog
      open={presenter?.settledStatusModal}
      onBackdropClick={() => {
        presenter.setSettledCaseStatusModal(false);
      }}
    >
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            value={presenter.vm?.settled_date}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  presenter.handleSettledCaseDate(null);
                },
              },
            }}
            label="Date Settled:"
            format={"DD/MM/YYYY"}
            onChange={(newValue) => {
              presenter.handleSettledCaseDate(newValue);
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
            presenter.setSettledCaseStatusModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            presenter.confirmSettleCase();
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AdminCaseSettledModal);
