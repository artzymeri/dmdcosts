import { useEffect, useMemo, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
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
      {presenter.loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <div className="admin-employees-content-title-container">
            <h2>Employees</h2>
            <Tooltip title="Add Employee Form Redirection" arrow>
              <Button
                variant="contained"
                color="success"
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
        </>
      )}
    </div>
  );
};

export default AdminEmployeesPresenter;
