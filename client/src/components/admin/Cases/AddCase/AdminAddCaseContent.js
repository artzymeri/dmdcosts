import { Button } from "@mui/material";
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
    <div className="admin-add-client-content-container">
      <div className="admin-add-client-content-title-container">
        <h2>Add Client</h2>
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
            presenter.saveNewCase();
          }}
        >
          <PersonAddRounded />
          <span>Confirm</span>
        </Button>
      </div>
      <AdminAddCaseForm presenter={presenter} />
    </div>
  );
};

export default observer(AdminAddCaseContent);
