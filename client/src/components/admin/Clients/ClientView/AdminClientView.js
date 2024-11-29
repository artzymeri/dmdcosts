import { observer } from "mobx-react-lite";
import AdminClientViewTitle from "./AdminClientViewTitle";
import AdminClientViewContent from "./AdminClientViewContent";

const AdminClientView = (props) => {
  const { presenter } = props;

  return (
    <div className="admin-client-content-container">
      <AdminClientViewTitle
        business_name={presenter?.clientDetails?.business_name}
        id={presenter?.clientDetails?.id}
      />
      <AdminClientViewContent presenter={presenter} />
    </div>
  );
};

export default observer(AdminClientView);
