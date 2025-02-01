import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminDashboardContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminDashboardPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, []);
  return (
    <div
      onClick={() => {
        console.log("instructed", presenter.instructedTodayCases);
        console.log("checked", presenter.checkedTodayCases);
        console.log("served", presenter.servedTodayCases);
        console.log("settled", presenter.settledTodayCases);
      }}
      className="admin-dashboard-content-container"
    >
      <div className="admin-dashboard-title-container">
        <h2>Dashboard</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ background: "white" }}
            value={presenter.vm?.todays_date}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  presenter.handleDateChange(null);
                },
              },
            }}
            label="Today's Date"
            format={"DD/MM/YYYY"}
            onChange={(newValue) => {
              presenter.handleDateChange(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default observer(AdminDashboardContent);
