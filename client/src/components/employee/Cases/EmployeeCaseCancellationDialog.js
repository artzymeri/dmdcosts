import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const EmployeeCaseCancellationDialog = ({presenter}) => {

    return (
        <Dialog open={presenter?.cancellationModalOpen} onBackdropClick={() => {
            presenter.setCancellationModal(false, null)
        }}>
            <DialogContent>
                Dëshironi të anuloni porosinë e zgjedhur?
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.setCancellationModal(false, null)
                }}>Kthehu</Button>
                <Button variant="contained" color="error" onClick={() => {
                    presenter.cancelOrder()
                }}>Anulo</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(EmployeeCaseCancellationDialog);