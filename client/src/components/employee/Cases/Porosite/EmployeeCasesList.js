import {observer} from "mobx-react-lite";
import UserCasesListItem from "./EmployeeCasesListItem";
import UserPorosiDeletionDialog from "@/components/employee/Cases/EmployeeCaseCancellationDialog";

const EmployeeCasesList = ({presenter}) => {

    return (<>
        <UserPorosiDeletionDialog presenter={presenter}/>
        <div className="employee-cases-list-container">
            {presenter?.clientOrders.map((order) => {
                return (
                    <UserCasesListItem cancelOrder={presenter.setCancellationModal} key={order?.id} item={order}/>
                )
            })}
            {presenter?.clientOrders.length == 0 &&
                <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>

            }
        </div>
    </>)
}

export default observer(EmployeeCasesList);