import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const EmployeeCaseTitle = ({ presenter }) => {
  const router = useRouter();

  return (
    <div className="employee-case-content-title-container">
      <Button
        className="back-button"
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push("/cases");
        }}
      >
        Porositë tuaja
      </Button>
      <div className="employee-case-title-container">
        <span>Case numër:</span>
        <span className="employee-case-id-banner">{`#${presenter.orderDetails?.id}`}</span>
      </div>
    </div>
  );
};

export default observer(EmployeeCaseTitle);
