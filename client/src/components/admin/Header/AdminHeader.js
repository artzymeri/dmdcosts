import { observer } from "mobx-react-lite";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { useEffect, useState } from "react";
import AdminHeaderNotificationsMenu from "@/components/admin/Header/AdminHeaderNotificationsMenu";
import AdminHeaderSettingsMenu from "@/components/admin/Header/AdminHeaderSettingsMenu";
import AdminSettingsPopup from "./AdminSettingsPopup";
import { Alert, Snackbar } from "@mui/material";
import AdminChangePasswordPopup from "./AdminChangePasswordPopup";

const AdminHeader = () => {
  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminHeaderPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, []);

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
      <AdminSettingsPopup presenter={presenter} />
      <AdminChangePasswordPopup presenter={presenter} />
      <div className="admin-header-container">
        <div className="admin-header-name-container">
          <span>Welcome</span>
          <span>{presenter?.employeeData?.name_surname}</span>
        </div>
        <div
          className="admin-header-icons-container"
          style={{ gap: presenter.notificationsNumber ? "20px" : "10px" }}
        >
          <AdminHeaderNotificationsMenu presenter={presenter} />
          <div className="admin-header-icons-divider"></div>
          <AdminHeaderSettingsMenu presenter={presenter} />
        </div>
      </div>
    </>
  );
};

export default observer(AdminHeader);
