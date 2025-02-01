import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardGridItem from "./DashboardGridItem";
import {
  Badge,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
const AdminDashboardContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminDashboardPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, []);

  const dashboardGridItems = [
    { id: 1, title: "Instructed Today", data: presenter.instructedTodayCases },
    { id: 2, title: "Checked Today", data: presenter.checkedTodayCases },
    { id: 3, title: "Served Today", data: presenter.servedTodayCases },
    { id: 4, title: "Settled Today", data: presenter.settledTodayCases },
  ];

  const customAlertMessage = (case_details) => {
    if (case_details.alert == "pod-expiring") {
      const POD_Date = dayjs(presenter.caseDetails?.pod_due_date).format(
        "DD/MM/YYYY"
      );
      return {
        case_reference: `${case_details.client_initials}.${case_details.type}.${case_details.id}`,
        alert: `POD is due to ${POD_Date}.`,
      };
    }

    if (case_details.alert == "pod-deadline") {
      return {
        case_reference: `${case_details.client_initials}.${case_details.type}.${case_details.id}`,
        alert: "POD check expires today!",
      };
    }

    if (case_details.alert == "pod-expired") {
      return {
        case_reference: `${case_details.client_initials}.${case_details.type}.${case_details.id}`,
        alert: "POD check expired!",
      };
    }

    if (case_details.alert == "last-offer-reminder") {
      return {
        case_reference: `${case_details.client_initials}.${case_details.type}.${case_details.id}`,
        alert: "Client has not returned an offer.",
      };
    }

    if (case_details.alert == "bill-needs-to-be-drafted") {
      return {
        case_reference: `${case_details.client_initials}.${case_details.type}.${case_details.id}`,
        alert: "Bill needs to get drafted!",
      };
    }

    if (case_details.alert == "bill-needs-to-be-served") {
      1;
      return {
        case_reference: `${case_details.client_initials}.${case_details.type}.${case_details.id}`,
        alert: "Bill needs to get served!",
      };
    }
  };

  return (
    <div className="admin-dashboard-content-container">
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
                  presenter.handleDateChange("clear");
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
      <div className="admin-dashboard-grid-container">
        {dashboardGridItems.map((item) => {
          return (
            <DashboardGridItem
              key={item?.id}
              title={item?.title}
              data={item?.data}
            />
          );
        })}
        <Card variant="outlined" sx={{ gridColumn: "span 2", padding: "15px" }}>
          <Badge
            badgeContent={presenter.notificationsMenuList.length}
            color="primary"
          >
            <h3 style={{ padding: "5px" }}>Reminders</h3>
          </Badge>
          <TableContainer
            sx={{ borderTop: "1px solid lightgray" }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reference</TableCell>
                  <TableCell align="right">Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presenter.notificationsMenuList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  presenter.notificationsMenuList.map((case_item) => (
                    <TableRow
                      key={case_item?.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {customAlertMessage(case_item).case_reference}
                      </TableCell>
                      <TableCell align="right">
                        {customAlertMessage(case_item).alert}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
};

export default observer(AdminDashboardContent);
