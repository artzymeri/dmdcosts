import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const AdminPorositeDeletionDialog = ({presenter}) => {

    return (
        <Dialog open={presenter?.deletionModalOpen} onBackdropClick={() => {
            presenter.handleDeleteOrdersModal(false)
        }}>
            <DialogContent>
                Dëshironi të fshini llogarinë e zgjedhur?
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.handleDeleteOrdersModal(false)
                }}>Anulo</Button>
                <Button variant="contained" color="error" onClick={() => {
                    presenter.deleteOrders()
                }}>Fshij</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(AdminPorositeDeletionDialog);