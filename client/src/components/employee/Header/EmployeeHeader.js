import { observer } from "mobx-react-lite";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { useEffect, useState } from "react";
import EmployeeHeaderSettingsMenu from "@/components/employee/Header/EmployeeHeaderSettingsMenu";
import { Alert, Snackbar } from "@mui/material";
import EmployeeSettingsPopup from "./EmployeeSettingsPopup";
import EmployeeChangePasswordPopup from "./EmployeeChangePasswordPopup";

const EmployeeHeader = () => {
  let presenter = container.get(TYPES.EmployeeHeaderPresenter);

  useEffect(() => {
    presenter.getEmployeeData().then(() => {});
  }, [presenter]);

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
      <EmployeeSettingsPopup presenter={presenter} />
      <EmployeeChangePasswordPopup presenter={presenter} />
      <div className="employee-header-container">
        <div className="employee-header-name-container">
          <span>Welcome</span>
          <span>{presenter?.employeeData?.name_surname}</span>
        </div>
        <div className="employee-header-icons-container">
          <EmployeeHeaderSettingsMenu presenter={presenter} />
        </div>
      </div>
    </>
  );
};

export default observer(EmployeeHeader);
