import { observer } from "mobx-react-lite";
import InvoicesDeletionDialog from "./InvoicesDeletionDialog";
import InvoicesListItem from "./InvoicesListItem";
import { DataGrid } from "@mui/x-data-grid";

const InvoicesList = ({ presenter }) => {
  return (
    <>
      <InvoicesDeletionDialog presenter={presenter} />
      <div style={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={presenter.allInvoices}
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

export default observer(InvoicesList);
