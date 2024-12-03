import { observer } from "mobx-react-lite";
import { Button, Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { useRouter } from "next/router";

const AdminCasesListItem = (props) => {
  const { item, presenter } = props;

  const router = useRouter();

  const statusCheck = (status) => {
    if (status == "to-do") {
      return "To Do";
    } else if (status == "to-fix") {
      return "To Fix";
    } else if (status == "done") {
      return "Done";
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
        onClick={(e) => {
          e.stopPropagation();
          presenter.handleCaseCheck(item?.id);
        }}
      />
      <Tooltip placement="top-start" title={`#${item?.reference_number}`} arrow>
        <span>{`#${item?.reference_number}`}</span>
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
        title={item?.paid ? "Paid" : "Unpaid"}
        arrow
      >
        <span>{item?.paid ? "Paid" : "Unpaid"}</span>
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
