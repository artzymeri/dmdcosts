import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const AdminCasesDeletionDialog = ({presenter}) => {

    return (
        <Dialog open={presenter?.deletionModalOpen} onBackdropClick={() => {
            presenter.handleDeleteCasesModal(false)
        }}>
            <DialogContent>
                Are you sure you want to delete this cases?
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.handleDeleteCasesModal(false)
                }}>Anulo</Button>
                <Button variant="contained" color="error" onClick={() => {
                    presenter.deleteCases()
                }}>Fshij</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(AdminCasesDeletionDialog);