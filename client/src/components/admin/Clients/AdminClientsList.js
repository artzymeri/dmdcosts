import { observer } from "mobx-react-lite";
import AdminClientsDeletionDialog from "./AdminClientsDeletionDialog";
import { DataGrid } from "@mui/x-data-grid";


const AdminClientsList = ({ presenter }) => {
  return (
    <>
      <AdminClientsDeletionDialog presenter={presenter} />
      <div style={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={presenter.allClients}
          columns={presenter?.vm?.table_columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) =>
            presenter.handleClientCheck(newSelection)
          }
        />
      </div>
    </>
  );
};

export default observer(AdminClientsList);
