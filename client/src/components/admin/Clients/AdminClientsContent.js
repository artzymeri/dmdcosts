import { useEffect, useMemo } from "react";
import AdminClientsHeader from "./AdminClientsHeader";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import AdminClientsList from "./AdminClientsList";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const AdminClientsContent = () => {
  const router = useRouter();

  const presenter = useMemo(
    () => container.get(TYPES.AdminClientsPresenter),
    []
  );

  useEffect(() => {
    presenter.getAllClients();
  }, []);

  return (
    <div className="admin-clients-content-container">
      <div className="admin-clients-content-title-container">
        <h2>Clients</h2>
        <Button
          variant="contained"
          color="success"
          sx={{ backgroundColor: "#00491e" }}
          onClick={() => {
            router.push("/addclient");
          }}
        >
          Add Client
        </Button>
      </div>
      <AdminClientsHeader presenter={presenter} />
      <AdminClientsList presenter={presenter} />
    </div>
  );
};

export default AdminClientsContent;
