import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";

const AdminSecondHeader = ({ presenter }) => {
  const router = useRouter();

  return (
    <div className="admin-cases-header-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          value={presenter.vm?.firstDateFilter}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => {
                presenter.handleDatesChange(null, "firstDateFilter");
              },
            },
          }}
          label="Starting Date"
          format={"DD/MM/YYYY"}
          onChange={(newValue) => {
            presenter.handleDatesChange(newValue, "firstDateFilter");
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          value={presenter.vm?.lastDateFilter}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => {
                presenter.handleDatesChange(null, "lastDateFilter");
              },
            },
          }}
          label="Ending Date"
          format={"DD/MM/YYYY"}
          onChange={(newValue) => {
            presenter.handleDatesChange(newValue, "lastDateFilter");
          }}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        size="large"
        color="success"
        disabled={presenter?.printInvoicesButtonDisabled}
        sx={{ textWrap: "nowrap", flexShrink: "0", height: "56px" }}
        onClick={() => {
          router.push("/invoices");
        }}
      >
        Produce Invoices
      </Button>
    </div>
  );
};

export default observer(AdminSecondHeader);
