import { observer } from "mobx-react-lite";
import EmployeeCasesListItem from "./EmployeeCasesListItem";

const EmployeeCasesList = ({ presenter }) => {
  return (
    <>
      <div className="admin-cases-list-container">
        {presenter?.allCases.map((item) => {
          return (
            <EmployeeCasesListItem
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

export default observer(EmployeeCasesList);
