import { useEffect, useMemo, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import AdminEmployeesHeader from "./AdminEmployeesHeader";
import AdminEmployeesList from "./AdminEmployeesList";

const AdminEmployeesPresenter = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminEmployeesPresenter)
  );

  useEffect(() => {
    presenter.getAllEmployees();
  }, []);

  return (
    <div className="admin-employees-content-container">
      <div className="admin-employees-content-title-container">
        <h2>Employees</h2>
        <Tooltip title="Add Employee Form Redirection" arrow>
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: "#00491e" }}
            onClick={() => {
              router.push("/addemployee");
            }}
          >
            Add Employee
          </Button>
        </Tooltip>
      </div>
      <AdminEmployeesHeader presenter={presenter} />
      <AdminEmployeesList presenter={presenter} />
    </div>
  );
};

export default AdminEmployeesPresenter;
