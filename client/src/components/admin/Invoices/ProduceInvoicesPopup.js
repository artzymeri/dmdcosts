import { observer } from "mobx-react-lite";
import SingleToProduceCasesList from "./SingleToProduceCasesList";
import BundleToProduceCasesList from "./BundleToProduceCasesList";

const {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} = require("@mui/material");

const ProduceInvoicesPopup = ({ presenter }) => {
  return (
    <Dialog
      fullWidth
      open={presenter.produceInvoicesPopup}
      onClose={() => {
        presenter.setProduceInvoicesPopup(false);
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "whitesmoke",
        }}
        borderBottom={"1px solid lightgray"}
      >
        Choose Type of Invoices
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          height: "100%",
          overflowY: "auto",
          flexDirection: "column",
          padding: "0",
          minHeight: "70dvh",
          maxHeight: "70dvh",
          background: "white",
        }}
      >
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "1fr 1fr",
            flexShrink: "0",
            borderBottom: "1px solid lightgray",
            background: "whitesmoke",
          }}
        >
          <Button
            sx={{ borderRadius: "0px" }}
            variant={presenter.produceInvoicesMode == "single" && "contained"}
            color={
              presenter.produceInvoicesMode === "single" ? "primary" : "inherit"
            }
            fullWidth
            onClick={() => {
              presenter.setProduceInvoicesMode("single");
            }}
          >
            Single
          </Button>
          <Button
            sx={{ borderRadius: "0px", borderLeft: "1px solid lightgray" }}
            variant={presenter.produceInvoicesMode == "bundle" && "contained"}
            color={
              presenter.produceInvoicesMode === "bundle" ? "primary" : "inherit"
            }
            fullWidth
            onClick={() => {
              presenter.setProduceInvoicesMode("bundle");
            }}
          >
            Bundle
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "15px",
            height: "100%",
            width: "100%",
            overflowY: "auto",
          }}
        >
          {presenter.produceInvoicesMode == "single" && (
            <SingleToProduceCasesList presenter={presenter} />
          )}
          {presenter.produceInvoicesMode == "bundle" && (
            <BundleToProduceCasesList presenter={presenter} />
          )}
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid lightgray",
          background: "whitesmoke",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            presenter.setProduceInvoicesPopup(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            presenter.produceInvoices();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(ProduceInvoicesPopup);
