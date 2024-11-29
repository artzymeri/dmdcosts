import { observer } from "mobx-react-lite";

const AdminClientViewTitle = (props) => {
  const { business_name, id } = props;
  return (
    <div className="admin-client-view-title-container">
      <span>{`${business_name} Details`}</span>
      <span>{`Client #${id}`}</span>
    </div>
  );
};

export default observer(AdminClientViewTitle);
