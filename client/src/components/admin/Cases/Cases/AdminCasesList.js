import { observer } from "mobx-react-lite";
import AdminCasesDeletionDialog from "@/components/admin/Cases/Cases/AdminCasesDeletionDialog";
import { DataGrid } from "@mui/x-data-grid";

const AdminCasesList = ({ presenter }) => {
  return (
    <>
      <AdminCasesDeletionDialog presenter={presenter} />
      <div style={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={presenter.allCases}
          columns={presenter?.vm?.table_columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) =>
            presenter.handleCaseCheck(newSelection)
          }
        />
      </div>
    </>
  );
};

export default observer(AdminCasesList);
