import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const AdminMbledhesitDeletionDialog = ({presenter}) => {

    return (
        <Dialog open={presenter?.deletionModalOpen} onBackdropClick={() => {
            presenter.setDeletionModal(false)
        }}>
            <DialogContent>
                Dëshironi të fshini llogarinë e zgjedhur?
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.setDeletionModal(false)
                }}>Anulo</Button>
                <Button variant="contained" color="error" onClick={() => {
                    presenter.deleteUsers()
                }}>Fshij</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(AdminMbledhesitDeletionDialog);