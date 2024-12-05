import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const AdminCaseTitle = ({ presenter }) => {
  const router = useRouter();

  return (
    <div className="admin-case-content-title-container">
      <Button
        sx={{ backgroundColor: "var(--dmd-costs--background-color)" }}
        className="back-button"
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push("/cases");
        }}
      >
        Cases
      </Button>
      <div className="admin-case-title-container">
        <span>Reference Number</span>
        <span className="admin-case-id-banner">{`#${presenter.caseDetails?.id}`}</span>
      </div>
    </div>
  );
};

export default observer(AdminCaseTitle);
