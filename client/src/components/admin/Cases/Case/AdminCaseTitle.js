import { Button, Tooltip } from "@mui/material";
import { ArrowBack, MenuOpen } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const AdminCaseTitle = ({ presenter }) => {
  const router = useRouter();

  return (
    <div className="admin-case-content-title-container">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Button
          className="back-button remove-mobile"
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => {
            router.push("/cases");
          }}
        >
          Cases
        </Button>
        <Tooltip title="Switch Case Details display" arrow>
          <Button
            className="back-button"
            variant="contained"
            onClick={() => {
              presenter.switchLeftSide();
            }}
          >
            <MenuOpen />
          </Button>
        </Tooltip>
      </div>
      <div className="admin-case-title-container">
        <span>Reference Number</span>
        <span className="admin-case-id-banner">{`#${presenter.caseDetails?.client_initials}.${presenter.caseDetails?.type}.${presenter.caseDetails?.id}`}</span>
      </div>
    </div>
  );
};

export default observer(AdminCaseTitle);
