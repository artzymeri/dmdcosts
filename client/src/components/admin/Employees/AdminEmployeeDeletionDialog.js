import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const AdminEmployeeDeletionDialog = ({presenter}) => {

    return (
        <Dialog open={presenter?.deletionModalOpen} onBackdropClick={() => {
            presenter.handleDeleteEmployeesModal(false)
        }}>
            {presenter?.singleToDeleteEmployee ? (
                <DialogContent>{`Are you sure you want to proceed to delete ${presenter?.singleToDeleteEmployee?.name_surname}?`}</DialogContent>
            ) : (
                <DialogContent>
                    Are you sure you want to proceed to delete selected employees?
                </DialogContent>
            )}
            <DialogActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="outlined" color="error" onClick={() => {
                    presenter.handleDeleteEmployeesModal(false)
                }}>Cancel Deletion</Button>
                <Button variant="contained" color="error" onClick={() => {
                    presenter.deleteEmployees().then((res) => {
                        presenter.setSnackbar(true, res.data);
                    })
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(AdminEmployeeDeletionDialog);