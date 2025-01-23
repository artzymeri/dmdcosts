import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { observer } from "mobx-react-lite";

const AdminCaseDetailsAddOfferModal = ({ presenter }) => {
  return (
    <Dialog
      open={presenter?.addOfferModalOpen}
      onBackdropClick={() => {
        presenter.setAddOfferModal(false);
      }}
    >
      <DialogTitle>
        Add Offer{" "}
        {presenter.typeOfOfferModal == "sent"
          ? "Sent Values"
          : "Received Values"}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            value={presenter.vm.new_offer_date}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  presenter.handleNewOfferDateChange(null);
                },
              },
            }}
            label={
              presenter.typeOfOfferModal == "sent"
                ? presenter.firstOffer ? "Date of Service:" : "Offer Sent Date:"
                : "Received Offer Date"
            }
            format={"DD/MM/YYYY"}
            onChange={(newValue) => {
              presenter.handleNewOfferDateChange(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          type="number"
          value={presenter.newOfferValue}
          placeholder={
            presenter.typeOfOfferModal == "sent"
              ? presenter.firstOffer ? "Bill Total:" : "Offer Amount:"
              : "Received Offer Value"
          }
          onChange={(e) => {
            presenter.handleNewOfferValueChange(e);
          }}
        />
        {presenter.caseOffers.length == 0 && (
          <FormControlLabel
            control={
              <Switch
                checked={presenter.vm.new_offer_formality}
                onChange={presenter.changeNewOfferFormality}
              />
            }
            label="Formal"
          />
        )}
        {presenter.vm.new_offer_formality && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              value={presenter.vm.pod_due_date}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    presenter.handlePodDueDate(null);
                  },
                },
              }}
              label={"POD Due Date"}
              format={"DD/MM/YYYY"}
              onChange={(newValue) => {
                presenter.handlePodDueDate(newValue);
              }}
            />
          </LocalizationProvider>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            presenter.setAddOfferModal(false);
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            presenter.confirmNewOffer().then((res) => {
              if (res) {
                presenter.setAddOfferModal(false);
                presenter.setSnackbar(true, res.data);
              }
            });
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AdminCaseDetailsAddOfferModal);
