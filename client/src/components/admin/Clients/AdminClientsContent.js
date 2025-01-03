import { useEffect, useState } from "react";
import AdminClientsHeader from "./AdminClientsHeader";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import AdminClientsList from "./AdminClientsList";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const AdminClientsContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminClientsPresenter)
  );

  useEffect(() => {
    presenter.getAllClients();
  }, []);

  return (
    <div className="admin-clients-content-container">
      <div className="admin-clients-content-title-container">
        <h2>Clients</h2>
        <Tooltip title="Add Client Form Redirection" arrow>
          <Button
            variant="contained"
            color="success"
            
            onClick={() => {
              router.push("/addclient");
            }}
          >
            Add Client
          </Button>
        </Tooltip>
      </div>
      <AdminClientsHeader presenter={presenter} />
      <AdminClientsList presenter={presenter} />
    </div>
  );
};

export default AdminClientsContent;
