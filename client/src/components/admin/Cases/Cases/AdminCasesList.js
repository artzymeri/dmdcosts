import { observer } from "mobx-react-lite";
import AdminCasesDeletionDialog from "@/components/admin/Cases/Cases/AdminCasesDeletionDialog";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const AdminCasesList = ({ presenter }) => {
  const statusCheck = (status) => {
    switch (status) {
      case "to-draft":
        return "To Draft";
      case "drafted":
        return "Drafted";
      case "checked":
        return "Checked";
      case "served":
        return "Served";
      case "settled":
        return "Settled";
      case "paid":
        return "Paid";
      case "to-amend":
        return "To Amend";
      default:
        return "Unknown";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "reference_number", headerName: "Reference", width: 150 },
    { field: "claimant_name", headerName: "Claimant", width: 150 },
    {
      field: "client_reference_number",
      headerName: "Client Reference",
      width: 150,
    },
    { field: "assignee_name_surname", headerName: "Assignee", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (row) => statusCheck(row?.status),
    },
    {
      field: "date_instructed",
      headerName: "Date Instructed",
      width: 180,
      valueGetter: (row) => dayjs(row?.date_instructed).format("DD|MM|YYYY"),
    },
  ];

  return (
    <>
      <AdminCasesDeletionDialog presenter={presenter} />
      <div style={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={presenter.allCases}
          columns={columns}
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
