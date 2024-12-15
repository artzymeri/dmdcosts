import {
  Close,
  CurrencyPound,
  Description,
  Done,
  DoneAll,
  DriveFileRenameOutline,
  MovingRounded,
  WavingHand,
} from "@mui/icons-material";
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
      return <Description />;
    }
    if (status == "to-amend") {
      return <DriveFileRenameOutline />;
    }
    if (status == "checked") {
      return <Done />;
    }
    if (status == "served") {
      return <WavingHand />;
    }
    if (status == "settled") {
      return <CurrencyPound />;
    }
    if (status == "paid") {
      return <DoneAll />;
    }
  };

  const checkProgressClass = (status) => {
    if (status == "to-draft") {
      return "admin-case-status-banner admin-case-status-banner-to-draft";
    }
    if (status == "drafted") {
      return "admin-case-status-banner admin-case-status-banner-drafted";
    }
    if (status == "checked") {
      return "admin-case-status-banner admin-case-status-banner-checked";
    }
    if (status == "to-amend") {
      return "admin-case-status-banner admin-case-status-banner-to-amend";
    }
    if (status == "served") {
      return "admin-case-status-banner admin-case-status-banner-served";
    }
    if (status == "settled") {
      return "admin-case-status-banner admin-case-status-banner-served";
    }
    if (status == "paid") {
      return "admin-case-status-banner admin-case-status-banner-paid";
    }
  };

  const checkProgressContent = (status) => {
    if (status == "to-draft") {
      return "Case is yet to be drafted!";
    }
    if (status == "drafted") {
      return "Case is drafted!";
    }
    if (status == "to-amend") {
      return "Case needs to amend!";
    }
    if (status == "checked") {
      return "Case is checked!";
    }
    if (status == "served") {
      return "Case is served!";
    }
    if (status == "settled") {
      return "Case is settled!";
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
