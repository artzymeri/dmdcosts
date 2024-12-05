import { Close, Done, MovingRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";

const AdminCaseStatusBanner = (props) => {
  const { status } = props;

  const checkProgressText = (status) => {
    if (status == "to-do") {
      return "To Do";
    }
    if (status == "to-fix") {
      return "To Fix";
    }
    if (status == "done") {
      return "Done";
    }
  };

  const checkProgressIcon = (status) => {
    if (status == "to-do") {
      return <MovingRounded />;
    }
    if (status == "to-fix") {
      return <Close />;
    }
    if (status == "done") {
      return <Done />;
    }
  };

  const checkProgressClass = (status) => {
    if (status == "to-do") {
      return "admin-case-status-banner admin-case-status-banner-to-do";
    }
    if (status == "to-fix") {
      return "admin-case-status-banner admin-case-status-banner-to-fix";
    }
    if (status == "done") {
      return "admin-case-status-banner admin-case-status-banner-done";
    }
  };

  const checkProgressContent = (status) => {
    if (status == "to-do") {
      return "Case is yet to be done!";
    }
    if (status == "to-fix") {
      return "Case beeds to get fixed!";
    }
    if (status == "done") {
      return "Case is done!";
    }
  };

  return (
    <Tooltip title={checkProgressContent(status)} arrow>
      <div className={checkProgressClass(status)}>
        {checkProgressIcon(status)}
        <span>{checkProgressText(status)}</span>
      </div>
    </Tooltip>
  );
};

export default observer(AdminCaseStatusBanner);
