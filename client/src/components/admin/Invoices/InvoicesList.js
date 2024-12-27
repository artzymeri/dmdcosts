import { observer } from "mobx-react-lite";
import InvoicesDeletionDialog from "./InvoicesDeletionDialog";
import InvoicesListItem from "./InvoicesListItem";

const InvoicesList = ({ presenter }) => {
  return (
    <>
      <InvoicesDeletionDialog presenter={presenter} />
      <div className="admin-cases-list-container">
        {presenter?.allCases.map((item) => {
          return (
            <InvoicesListItem
              presenter={presenter}
              key={item?.id}
              item={item}
            />
          );
        })}
        {presenter.allCases.length === 0 && (
          <span style={{ width: "100%", textAlign: "center" }}>No Data</span>
        )}
      </div>
    </>
  );
};

export default observer(InvoicesList);
