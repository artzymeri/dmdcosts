import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const InvoicesDeletionDialog = ({presenter}) => {

    const handleDeleteFunctions = () => {
        if (presenter.singleToDeleteCase) {
            presenter.deleteSingleCase()
        } else {
            presenter.deleteCases()
        }
    }

    return (
        <Dialog open={presenter?.deletionModalOpen} onBackdropClick={() => {
            presenter.handleDeleteCasesModal(false)
        }}>
            <DialogContent>
                {presenter.singleToDeleteCase ? "Are you sure you want to delete the selected case?" : "Are you sure you want to delete the selected cases?"}
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.handleDeleteCasesModal(false)
                }}>Cancel</Button>
                <Button variant="contained" color="error" onClick={() => {
                    handleDeleteFunctions()
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(InvoicesDeletionDialog);