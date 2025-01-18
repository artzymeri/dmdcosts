import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import AdminCasesHeader from "@/components/admin/Cases/Cases/AdminCasesHeader";
import AdminCasesList from "@/components/admin/Cases/Cases/AdminCasesList";
import AdminSecondHeader from "@/components/admin/Cases/Cases/AdminCasesSecondHeader";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const AdminCasesContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminCasesPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, []);

  return (
    <div className="admin-cases-content-container">
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
          <div className="admin-cases-content-title-container">
            <h2>Cases</h2>
            <Tooltip title="Add Case Form Redirection" arrow>
              <Button
                variant="contained"
                color="success"
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
        </>
      )}
    </div>
  );
};

export default observer(AdminCasesContent);
