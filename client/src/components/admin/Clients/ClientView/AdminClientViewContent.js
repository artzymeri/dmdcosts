import { observer } from "mobx-react-lite";
import AdminClientViewContentLeftSide from "./AdminClientViewContentLeftSide";

const AdminClientViewContent = (props) => {
  const { presenter } = props;
  return (
    <div className="admin-client-view-content-container">
      <AdminClientViewContentLeftSide presenter={presenter} />
      <div className="admin-client-view-content-middle"></div>
      <div className="admin-client-view-content-right-side">
          {
              presenter.client_cases && presenter.client_cases.map((case_details) => {
                  return (
                      <div key={case_details.id}>
                          {case_details.id}
                      </div>
                  )
              })
          }
      </div>
    </div>
  );
};

export default observer(AdminClientViewContent);
