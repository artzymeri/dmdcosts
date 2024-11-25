import UserSidebar from "@/components/user/UserSidebar";
import {observer} from "mobx-react-lite";

const userHOC = ({children}) => {
    return (
        <div className="user-layout-parent">
            <UserSidebar />
            <div className="user-layout-content">
                {children}
            </div>
        </div>
    )
}

export default observer(userHOC);