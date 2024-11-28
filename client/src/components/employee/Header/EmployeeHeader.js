import { observer } from "mobx-react-lite";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { useEffect, useState } from "react";
import UserHeaderNotificationsMenu from "@/components/employee/Header/EmployeeHeaderNotificationsMenu";
import UserHeaderSettingsMenu from "@/components/employee/Header/EmployeeHeaderSettingsMenu";

const EmployeeHeader = () => {
  let presenter = container.get(TYPES.UserHeaderPresenter);

  useEffect(() => {
    presenter.getUserData().then(() => {});
  }, [presenter]);

  return (
    <div className="employee-header-container">
      <div className="employee-header-name-container">
        <span>Welcome</span>
        <span>{presenter?.employeeData?.name_surname}</span>
      </div>
      <div className="employee-header-icons-container">
        <UserHeaderNotificationsMenu />
        <div className="employee-header-icons-divider"></div>
        <UserHeaderSettingsMenu />
      </div>
    </div>
  );
};

export default observer(EmployeeHeader);
