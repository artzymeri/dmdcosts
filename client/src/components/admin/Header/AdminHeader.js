import { observer } from "mobx-react-lite";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { useEffect, useState } from "react";
import AdminHeaderNotificationsMenu from "@/components/admin/Header/AdminHeaderNotificationsMenu";
import AdminHeaderSettingsMenu from "@/components/admin/Header/AdminHeaderSettingsMenu";

const AdminHeader = () => {
  let presenter = container.get(TYPES.AdminHeaderPresenter);

  useEffect(() => {
    presenter.getUserData().then(() => {});
  }, [presenter]);

  return (
    <div className="admin-header-container">
      <div className="admin-header-name-container">
        <span>Welcome</span>
        <span>{presenter?.employeeData?.name_surname}</span>
      </div>
      <div className="admin-header-icons-container">
        <AdminHeaderNotificationsMenu />
        <div className="admin-header-icons-divider"></div>
        <AdminHeaderSettingsMenu />
      </div>
    </div>
  );
};

export default observer(AdminHeader);
