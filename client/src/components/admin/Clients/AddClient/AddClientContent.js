import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import AddClientForm from "./AddClientForm";
import { useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { PersonAddRounded } from "@mui/icons-material";

const AddClientContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminAddClientPresenter)
  );

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
            presenter.saveNewClient();
          }}
        >
          <PersonAddRounded />
          <span>Confirm</span>
        </Button>
      </div>
      <AddClientForm presenter={presenter} />
    </div>
  );
};

export default observer(AddClientContent);
