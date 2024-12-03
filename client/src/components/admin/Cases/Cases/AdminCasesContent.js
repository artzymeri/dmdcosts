import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import AdminCasesHeader from "@/components/admin/Cases/Cases/AdminCasesHeader";
import AdminCasesList from "@/components/admin/Cases/Cases/AdminCasesList";
import AdminSecondHeader from "@/components/admin/Cases/Cases/AdminCasesSecondHeader";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const AdminCasesContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminCasesPresenter)
  );

  useEffect(() => {
    // presenter.getAllCases();
  }, []);

  return (
    <div className="admin-cases-content-container">
      <div className="admin-cases-content-title-container">
        <h2>Cases</h2>
        <Tooltip title="Add Case Form Redirection" arrow>
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: "#00491e" }}
            onClick={() => {
              router.push("/addcase");
            }}
          >
            Add Case
          </Button>
        </Tooltip>
      </div>
      <AdminCasesHeader presenter={presenter} />
      <AdminSecondHeader presenter={presenter} />
      <AdminCasesList presenter={presenter} />
    </div>
  );
};

export default observer(AdminCasesContent);
