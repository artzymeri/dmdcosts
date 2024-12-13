import { CloseRounded, DoneRounded, MovingRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const AdminClientViewContentRightSide = (props) => {
  const { presenter } = props;
  const router = useRouter();

  const checkProgressIcon = (status) => {
    if (status == "to-do") {
      return <MovingRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "to-fix") {
      return <CloseRounded sx={{ width: "10px", height: "10px" }} />;
    }
    if (status == "done") {
      return <DoneRounded sx={{ width: "10px", height: "10px" }} />;
    }
  };

  const checkProgressClass = (status) => {
    if (status == "to-do") {
      return "admin-case-status-banner-to-do";
    }
    if (status == "to-fix") {
      return "admin-case-status-banner-to-fix";
    }
    if (status == "done") {
      return "admin-case-status-banner-done";
    }
  };

  const checkProgressContent = (status) => {
    if (status == "to-do") {
      return "Case is yet to be done!";
    }
    if (status == "to-fix") {
      return "Case needs to get fixed!";
    }
    if (status == "done") {
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
