import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {observer} from "mobx-react-lite";

const AdminCaseViewDeletionModal = ({presenter}) => {

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
                        presenter.deleteCase();
                    }}
                >
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(AdminCaseViewDeletionModal);