import { CloseRounded, DoneRounded, MovingRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const AdminClientViewContentRightSide = (props) => {
  const { presenter } = props;
  const router = useRouter();

  const checkProgressIcon = (status) => {
    if (status == "to-draft") {
      return <MovingRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "drafted") {
      return <CloseRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "to-amend") {
      return <DoneRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "checked") {
      return <DoneRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "served") {
      return <DoneRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "settled") {
      return <DoneRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "paid") {
      return <DoneRounded sx={{ width: "10px", height: "10px" }} />;
    }
  };

  const checkProgressClass = (status) => {
    if (status == "to-draft") {
      return "admin-case-status-banner-to-do";
    }
    if (status == "drafted") {
      return "admin-case-status-banner-to-fix";
    }
    if (status == "to-amend") {
      return "admin-case-status-banner-done";
    }
    if (status == "checked") {
      return "admin-case-status-banner-done";
    }
    if (status == "served") {
      return "admin-case-status-banner-done";
    }
    if (status == "settled") {
      return "admin-case-status-banner-done";
    }
    if (status == "paid") {
      return "admin-case-status-banner-done";
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
      return "Case is done!";
    }
  };

  return (
    <div className="admin-client-view-content-right-side">
      <span className="admin-client-ciew-content-right-side-title">
        Cases linked to client:
      </span>
      {presenter.client_cases?.length > 0 ? (
        <div className="admin-client-view-content-right-side-cases-list">
          {presenter.client_cases.map((case_details) => (
            <div
              className="admin-client-view-content-right-side-row"
              key={case_details?.id}
              onClick={() => {
                router.push(`/case/${case_details.id}`);
              }}
            >
              <Tooltip title={checkProgressContent(case_details?.status)}>
                <div
                  className={`admin-client-view-content-right-side-row-status-badge ${checkProgressClass(
                    case_details?.status
                  )}`}
                >
                  {checkProgressIcon(case_details?.status)}
                </div>
              </Tooltip>
              <div className="admin-client-view-content-right-side-row-half">
                <span className="admin-client-view-content-right-side-row-label">
                  Reference Number:
                </span>
                <span className="admin-client-view-content-right-side-row-value">
                  {case_details?.reference_number}
                </span>
              </div>
              <div className="admin-client-view-content-right-side-row-middle"></div>
              <div className="admin-client-view-content-right-side-row-half">
                <span className="admin-client-view-content-right-side-row-label">
                  Date of Creation:
                </span>
                <span className="admin-client-view-content-right-side-row-value">
                  {dayjs(case_details?.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-client-view-content-right-side-no-cases-linked">
          No cases linked to this client!
        </div>
      )}
    </div>
  );
};

export default AdminClientViewContentRightSide;
