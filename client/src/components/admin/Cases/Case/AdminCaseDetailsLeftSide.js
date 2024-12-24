import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const AdminCaseDetailsLeftSide = ({ presenter }) => {
  const details = [
    {
      label: "Client Firm Name:",
      value: presenter.caseClient?.business_name || null,
    },
    {
      label: "Employee Assigned:",
      value: presenter.assignedEmployee?.name_surname || null,
    },
    {
      label: "Date Created:",
      value: presenter.caseDetails?.createdAt
        ? dayjs(presenter.caseDetails.createdAt).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Date Instructed:",
      value: presenter.caseDetails?.date_instructed
        ? dayjs(presenter.caseDetails.date_instructed).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Date Checked:",
      value: presenter.caseDetails?.checked_date
        ? dayjs(presenter.caseDetails.checked_date).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Date Settled:",
      value: presenter.caseDetails?.settled_date
        ? dayjs(presenter.caseDetails.settled_date).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "POD due date:",
      value: presenter.caseDetails?.pod_due_date
        ? dayjs(presenter.caseDetails.pod_due_date).format("DD/MM/YYYY")
        : null,
    },
    {
      label: "Negotiable:",
      value: presenter.caseDetails?.negotiable ? "Yes" : null,
    },
    {
      label: "Claimant Name:",
      value: presenter.caseDetails?.claimant_name || null,
    },
    {
      label: "Client Reference Number:",
      value: presenter.caseDetails?.client_reference_number || null,
    },
    {
      label: "Defendant Name:",
      value: presenter.caseDetails?.defendant_name || null,
    },
    {
      label: "Defendant Reference Number:",
      value: presenter.caseDetails?.defendant_reference_number || null,
    },
    {
      label: "Defendant Email:",
      value: presenter.caseDetails?.defendant_email || null,
    },
    {
      label: "DMD Rate:",
      value: presenter.caseDetails?.rate_per_hour || null,
    },
  ];

  return (
    <div className="admin-case-details-left-side">
      <span className="admin-case-details-left-side-title">Case Details:</span>
      {details.map(({ label, value, className = "" }, index) => {
        if (!value) return null;

        return (
          <div
            key={index}
            className={`admin-case-details-left-side-row ${className}`}
            style={index === 0 ? { marginTop: "20px" } : undefined}
          >
            <span className="admin-case-details-left-side-label">{label}</span>
            <span className="admin-case-details-left-side-info">{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default observer(AdminCaseDetailsLeftSide);
