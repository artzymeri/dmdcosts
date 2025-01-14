import { observer } from "mobx-react-lite";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const EmployeeCasesListItem = (props) => {
  const { item, presenter } = props;

  const router = useRouter();

  const statusCheck = (status) => {
    if (status == "to-draft") {
      return "To Draft";
    } else if (status == "drafted") {
      return "Drafted";
    } else if (status == "checked") {
      return "Checked";
    } else if (status == "served") {
      return "Served";
    } else if (status == "settled") {
      return "Settled";
    } else if (status == "paid") {
      return "Paid";
    } else if (status == "to-amend") {
      return "To Amend";
    }
  };

  return (
    <div
      onClick={() => {
        router.push(`/case/${item?.id}`);
      }}
      className={`employee-cases-list-item`}
    >
      <Tooltip
        placement="top-start"
        title={`#${item?.client_initials}.${item?.type}.${item?.id}`}
        arrow
      >
        <span>{`#${item?.client_initials}.${item?.type}.${item?.id}`}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={item?.client_business_name} arrow>
        <span>{item?.client_business_name}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={item?.assignee_name_surname} arrow>
        <span>{item?.assignee_name_surname}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={statusCheck(item?.status)} arrow>
        <span>{statusCheck(item?.status)}</span>
      </Tooltip>
      <Tooltip
        placement="top-start"
        title={item?.negotiable ? "Negotiable" : "Non-Negotiable"}
        arrow
      >
        <span>{item?.negotiable ? "Negotiable" : "Non-Negotiable"}</span>
      </Tooltip>
      <Tooltip
        placement="top-start"
        title={dayjs(item?.date_instructed).format("DD|MM|YYYY")}
        arrow
      >
        <span>{dayjs(item?.date_instructed).format("DD|MM|YYYY")}</span>
      </Tooltip>
    </div>
  );
};

export default observer(EmployeeCasesListItem);
