import { observer } from "mobx-react-lite";
import AdminClientViewContentLeftSide from "./AdminClientViewContentLeftSide";
import AdminClientViewContentRightSide from "./AdminClientViewRightSide";

const AdminClientViewContent = (props) => {
  const { presenter } = props;
  return (
    <div className="admin-client-view-content-container">
      <AdminClientViewContentLeftSide presenter={presenter} />
      <div className="admin-client-view-content-middle"></div>
      <AdminClientViewContentRightSide presenter={presenter} />
    </div>
  );
};

export default observer(AdminClientViewContent);
