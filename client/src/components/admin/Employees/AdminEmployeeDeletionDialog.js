import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const AdminEmployeeDeletionDialog = ({presenter}) => {

    return (
        <Dialog open={presenter?.deletionModalOpen} onBackdropClick={() => {
            presenter.setDeletionModal(false)
        }}>
            <DialogContent>
                Are you sure you want to delete this employee?
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.setDeletionModal(false)
                }}>Cancel Deletion</Button>
                <Button variant="contained" color="error" onClick={() => {
                    presenter.deleteEmployees()
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(AdminEmployeeDeletionDialog);