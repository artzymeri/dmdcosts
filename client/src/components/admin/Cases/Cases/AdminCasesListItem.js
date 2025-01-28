import { observer } from "mobx-react-lite";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const AdminCasesListItem = (props) => {
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
      className={`admin-cases-list-item`}
    >
      <Checkbox
        className="remove-mobile"
        onClick={(e) => {
          e.stopPropagation();
          presenter.handleCaseCheck(item?.id);
        }}
      />
      <Tooltip
        placement="top-start"
        title={`#${item?.client_initials}.${item?.type}.${item?.id}`}
        arrow
      >
        <span>{`#${item?.client_initials}.${item?.type}.${item?.id}`}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={item?.claimant_name}
        arrow
      >
        <span>{item?.claimant_name}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={item?.client_reference_number}
        arrow
      >
        <span>{item?.client_reference_number}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={item?.assignee_name_surname}
        arrow
      >
        <span>{item?.assignee_name_surname}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={statusCheck(item?.status)}
        arrow
      >
        <span>{statusCheck(item?.status)}</span>
      </Tooltip>
      <Tooltip
        placement="top-start"
        className="remove-mobile"
        title={item?.negotiable ? "Negotiable" : "Non-Negotiable"}
        arrow
      >
        <span>{item?.negotiable ? "Negotiable" : "Non-Negotiable"}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={dayjs(item?.date_instructed).format("DD|MM|YYYY")}
        arrow
      >
        <span>{dayjs(item?.date_instructed).format("DD|MM|YYYY")}</span>
      </Tooltip>
      <Tooltip placement="top" title="Click to delete case" arrow>
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            presenter.handleSingleDeletionCasesModal(item?.id, true);
          }}
        >
          <DeleteOutlineRounded />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default observer(AdminCasesListItem);
