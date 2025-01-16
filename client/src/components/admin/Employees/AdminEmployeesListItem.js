import { observer } from "mobx-react-lite";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";

const AdminEmployeesListItem = (props) => {
  const { item, presenter } = props;

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      <div className="admin-employees-list-item">
        <Checkbox
          className="remove-mobile"
          onChange={() => {
            presenter.handleEmployeeCheck(item?.id);
          }}
        />
        <Tooltip placement="top-start" title={item?.username} arrow>
          {item?.username ? item.username : "No Data"}
        </Tooltip>
        <Tooltip placement="top-start" title={item?.name_surname} arrow>
          {item?.name_surname ? item.name_surname : "No Data"}
        </Tooltip>
        <Tooltip
          className="remove-mobile"
          placement="top-start"
          title={item?.email_address}
          arrow
        >
          {item?.email_address ? item.email_address : "No Data"}
        </Tooltip>
        <Tooltip
          className="remove-mobile"
          placement="top-start"
          title={item?.role}
          arrow
        >
          <span>
            {item?.role ? capitalizeFirstLetter(item.role) : "No Data"}
          </span>
        </Tooltip>
        <Tooltip placement="top" title="Click to delete employee" arrow>
          <IconButton
            color="error"
            onClick={() => {
              presenter.handleSingleDeletionEmployeesModal(item?.id, true);
            }}
          >
            <DeleteOutlineRounded />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default observer(AdminEmployeesListItem);
