import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const AdminCaseViewDeletionModal = ({ presenter }) => {
  const router = useRouter();

  return (
    <Dialog
      open={presenter?.deletionConfirmationModal}
      onBackdropClick={() => {
        presenter.setDeletionConfirmationModal(false);
      }}
    >
      <DialogContent>
        Are you sure you want to proceed to delete the selected case?
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
            presenter.setDeletionConfirmationModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            presenter.deleteCase().then((res) => {
              if (res.data.title == "success") {
                router.push("/cases");
              }
            });
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AdminCaseViewDeletionModal);
