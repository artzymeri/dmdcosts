import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import AddClientForm from "./AddClientForm";
import { useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";

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
          sx={{ backgroundColor: "#00491e" }}
          onClick={() => {
            router.push("/addclient");
          }}
        >
          Confirm
        </Button>
      </div>
      <AddClientForm presenter={presenter} />
    </div>
  );
};

export default observer(AddClientContent);
