import {observer} from "mobx-react-lite";
import AdminEmployeeDeletionDialog from "@/components/admin/Employees/AdminEmployeeDeletionDialog";
import AdminEmployeesListItem from "@/components/admin/Employees/AdminEmployeesListItem";
import {Alert, Snackbar} from "@mui/material";

const AdminEmployeesList = ({presenter}) => {
    return (
        <>
            <Snackbar open={presenter?.snackbarBoolean} autoHideDuration={3000}>
                <Alert
                    severity={presenter?.snackbarDetails?.title}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {presenter?.snackbarDetails?.message}
                </Alert>
            </Snackbar>
            <AdminEmployeeDeletionDialog presenter={presenter}/>
            <div className="admin-employees-list-container">
                {presenter?.allEmployees.map((item) => {
                    return (
                        <AdminEmployeesListItem
                            presenter={presenter}
                            key={item?.id}
                            item={item}
                        />
                    );
                })}
                {presenter.allEmployees.length === 0 && (
                    <span style={{width: "100%", textAlign: "center"}}>No Data</span>
                )}
            </div>
        </>
    );
};

export default observer(AdminEmployeesList);
