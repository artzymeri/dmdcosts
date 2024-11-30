import { Alert, Button, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import AddEmployeeForm from "./AddEmployeeForm";
import { useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { PersonAddRounded } from "@mui/icons-material";

const AddEmployeeContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminAddEmployeePresenter)
  );

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
      <div className="admin-add-employee-content-container">
        <div className="admin-add-employee-content-title-container">
          <h2>Add Employee</h2>
          <Button
            variant="contained"
            color="success"
            sx={{
              backgroundColor: "#00491e",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            onClick={() => {
              presenter.saveNewEmployee().then((res) => {
                presenter.setSnackbar(true, res.data);
              });
            }}
          >
            <PersonAddRounded />
            <span>Confirm</span>
          </Button>
        </div>
        <AddEmployeeForm presenter={presenter} />
      </div>
    </>
  );
};

export default observer(AddEmployeeContent);
