import { observer } from "mobx-react-lite";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const AdminClientsDeletionDialog = ({ presenter }) => {
  return (
    <Dialog
      open={presenter?.deletionModalOpen}
      onBackdropClick={() => {
        presenter.handleDeleteClientsModal(false);
      }}
    >
      {presenter?.singleToDeleteClient ? (
        <DialogContent>{`Are you sure you want to proceed to delete ${presenter?.singleToDeleteClient?.business_name}?`}</DialogContent>
      ) : (
        <DialogContent>
          Are you sure you want to proceed to delete selected clients?
        </DialogContent>
      )}
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
            presenter.handleDeleteClientsModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            presenter.deleteClients();
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AdminClientsDeletionDialog);
