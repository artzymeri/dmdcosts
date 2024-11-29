import { observer } from "mobx-react-lite";
import AdminClientsListItem from "./AdminClientsListItem";
import AdminClientsDeletionDialog from "./AdminClientsDeletionDialog";

const AdminClientsList = ({ presenter }) => {
  return (
    <>
      <AdminClientsDeletionDialog presenter={presenter} />
      <div className="admin-clients-list-container">
        {presenter?.allClients.map((client) => {
          return (
            <AdminClientsListItem
              presenter={presenter}
              key={client?.id}
              client={client}
          />
          );
        })}
        {presenter.allClients.length === 0 && (
          <span style={{ width: "100%", textAlign: "center" }}>No Data</span>
        )}
      </div>
    </>
  );
};

export default observer(AdminClientsList);
