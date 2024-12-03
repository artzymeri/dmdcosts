import { Alert, Button, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { PersonAddRounded } from "@mui/icons-material";
import AdminAddCaseForm from "./AdminAddCaseForm";

const AdminAddCaseContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminAddCasePresenter)
  );

  useEffect(() => {
    presenter.getClientsEmployeesList();
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
      <div className="admin-add-case-content-container">
        <div className="admin-add-case-content-title-container">
          <h2>Add Case</h2>
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
              presenter.saveNewCase().then((res) => {
                presenter.setSnackbar(true, res.data);
              });
            }}
          >
            <PersonAddRounded />
            <span>Add Case</span>
          </Button>
        </div>
        <AdminAddCaseForm presenter={presenter} />
      </div>
    </>
  );
};

export default observer(AdminAddCaseContent);
