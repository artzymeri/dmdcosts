import { observer } from "mobx-react-lite";
import AdminEmployeeDeletionDialog from "@/components/admin/Employees/AdminEmployeeDeletionDialog";
import { Alert, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AdminEmployeesList = ({ presenter }) => {
  return (
    <>
      <Snackbar open={presenter?.snackbarBoolean} autoHideDuration={3000}>
        <Alert
          severity={presenter?.snackbarDetails?.title}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {presenter?.snackbarDetails?.message}
        </Alert>
      </Snackbar>
      <AdminEmployeeDeletionDialog presenter={presenter} />
      <div style={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={presenter.allEmployees}
          columns={presenter?.vm?.table_columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) =>
            presenter.handleEmployeeCheck(newSelection)
          }
        />
      </div>
    </>
  );
};

export default observer(AdminEmployeesList);
