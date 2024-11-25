import {observer} from "mobx-react-lite";
import UserPorosiaTitle from "@/components/user/Porosite/Porosia/UserPorosiaTitle";
import UserPorosiaDetailsLeftSide from "@/components/user/Porosite/Porosia/UserPorosiaDetailsLeftSide";
import UserPorosiaDetailsRightSide from "@/components/user/Porosite/Porosia/UserPorosiaDetailsRightSide";

const UserPorosiaView = ({presenter}) => {

    return (
        <div className="user-porosia-content-container">
            <UserPorosiaTitle presenter={presenter}/>
            <div className="user-porosia-details-container">
                <UserPorosiaDetailsLeftSide presenter={presenter}/>
                <div className="user-porosia-details-middle"></div>
                <UserPorosiaDetailsRightSide presenter={presenter}/>
            </div>
        </div>
    );
};

export default observer(UserPorosiaView);
