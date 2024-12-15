import { observer } from "mobx-react-lite";
import { Button, Checkbox, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { DeleteOutlineRounded } from "@mui/icons-material";

const AdminClientsListItem = (props) => {
  const { client, presenter } = props;

  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/client/${client?.id}`);
      }}
      className="admin-clients-list-item"
    >
      <Checkbox
        onClick={(e) => {
          e.stopPropagation();
          presenter.handleClientCheck(client?.id);
        }}
      />
      <Tooltip placement="top-start" title={client?.business_name} arrow>
        <span>{client?.business_name}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={client?.address} arrow>
        <span>{client?.address}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={client?.email_address} arrow>
        <span>{client?.email_address}</span>
      </Tooltip>
      <Tooltip placement="top" title="Click to delete case" arrow>
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            presenter.handleSingleDeletionClientsModal(client?.id, true);
          }}
        >
          <DeleteOutlineRounded />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default observer(AdminClientsListItem);
