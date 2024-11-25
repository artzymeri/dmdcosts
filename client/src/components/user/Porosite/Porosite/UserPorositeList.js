import {observer} from "mobx-react-lite";
import UserPorositeListItem from "./UserPorositeListItem";
import UserPorosiDeletionDialog from "@/components/user/Porosite/UserPorosiCancellationDialog";

const UserPorositeList = ({presenter}) => {

    return (<>
        <UserPorosiDeletionDialog presenter={presenter}/>
        <div className="user-porosite-list-container">
            {presenter?.clientOrders.map((order) => {
                return (
                    <UserPorositeListItem cancelOrder={presenter.setCancellationModal} key={order?.id} item={order}/>
                )
            })}
            {presenter?.clientOrders.length == 0 &&
                <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>

            }
        </div>
    </>)
}

export default observer(UserPorositeList);