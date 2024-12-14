import { Close, Done, MovingRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";

const AdminCaseStatusBanner = (props) => {
  const { status } = props;

  const checkProgressText = (status) => {
    if (status == "to-draft") {
      return "To Draft";
    }
    if (status == "drafted") {
      return "Drafted";
    }
    if (status == "to-amend") {
      return "To Amend";
    }
    if (status == "checked") {
      return "Checked";
    }
    if (status == "served") {
      return "Served";
    }
    if (status == "settled") {
      return "Settled";
    }
    if (status == "paid") {
      return "Paid";
    }
  };

  const checkProgressIcon = (status) => {
    if (status == "to-draft") {
      return <MovingRounded />;
    }
    if (status == "drafted") {
      return <Close />;
    }
    if (status == "to-amend") {
      return <Done />;
    }
    if (status == "checked") {
      return <Done />;
    }
    if (status == "served") {
      return <Done />;
    }
    if (status == "settled") {
      return <Done />;
    }
    if (status == "paid") {
      return <Done />;
    }
  };

  const checkProgressClass = (status) => {
    if (status == "to-draft") {
      return "admin-case-status-banner admin-case-status-banner-to-do";
    }
    if (status == "drafted") {
      return "admin-case-status-banner admin-case-status-banner-to-fix";
    }
    if (status == "checked") {
      return "admin-case-status-banner admin-case-status-banner-done";
    }
    if (status == "to-amend") {
      return "admin-case-status-banner admin-case-status-banner-done";
    }
    if (status == "served") {
      return "admin-case-status-banner admin-case-status-banner-done";
    }
    if (status == "settled") {
      return "admin-case-status-banner admin-case-status-banner-done";
    }
    if (status == "paid") {
      return "admin-case-status-banner admin-case-status-banner-done";
    }
  };

  const checkProgressContent = (status) => {
    if (status == "to-draft") {
      return "Case is yet to be done!";
    }
    if (status == "drafted") {
      return "Case needs to get fixed!";
    }
    if (status == "to-amend") {
      return "Case is done!";
    }
    if (status == "checked") {
      return "Case is done!";
    }
    if (status == "served") {
      return "Case is done!";
    }
    if (status == "settled") {
      return "Case is done!";
    }
    if (status == "paid") {
      return "Case is paid!";
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
