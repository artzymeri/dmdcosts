import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const AdminCaseDetailsLeftSide = ({ presenter }) => {
  const details = [
    { label: "Client Firm Name:", value: presenter.caseClient?.business_name },
    {
      label: "Employee Assigned",
      value: presenter.assignedEmployee?.name_surname,
    },
    {
      label: "Date of Creation:",
      value: dayjs(presenter.caseDetails?.createdAt).format(
        "MM:HH, DD/MM/YYYY"
      ),
    },
  ];

  return (
    <div className="admin-case-details-left-side">
      <span className="admin-case-details-left-side-title">Case Details:</span>
      {details.map(({ label, value, className = "" }, index) => (
        <div
          key={index}
          className={`admin-case-details-left-side-row ${className}`}
          style={index === 0 ? { marginTop: "20px" } : undefined}
        >
          <span className="admin-case-details-left-side-label">{label}</span>
          <span className="admin-case-details-left-side-info">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default observer(AdminCaseDetailsLeftSide);
