import { observer } from "mobx-react-lite";
import AdminClientViewContentLeftSide from "./AdminClientViewContentLeftSide";

const AdminClientViewContent = (props) => {
  const { presenter } = props;
  return (
    <div className="admin-client-view-content-container">
      <AdminClientViewContentLeftSide presenter={presenter} />
      <div className="admin-client-view-content-middle"></div>
      <div className="admin-client-view-content-right-side">
        cases linked to this client displayed here
      </div>
    </div>
  );
};

export default observer(AdminClientViewContent);
