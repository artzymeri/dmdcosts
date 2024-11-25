import {LogoutRounded} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";

const UserSidebar = () => {

    const router = useRouter();
    const presenter = container.get(TYPES.UserSidebarPresenter);

    return (
        <div className="user-sidebar-container">
            <div className="user-sidebar-logo-container">
                <img src="/superpostafull-transparent.png"/>
            </div>
            <div className="user-sidebar-items-container">
                {presenter?.sidebarItems.map((item) => {
                    return (
                        <div key={item?.id} className={`${item.pathName == router.route ? 'user-sidebar-item-selected' : 'user-sidebar-item'}`} onClick={() => {
                            router.push(item?.route)
                        }}>
                            {item?.icon}
                            {item?.title}
                        </div>
                    )
                })}
            </div>
            <div className="user-sidebar-logout-container">
                <button className="user-sidebar-logout-button"
                        onClick={() => {
                            presenter.logout().then(() => {
                                router.push('/kycu')
                            })
                        }}>
                    <LogoutRounded sx={{height: '18px', width: '18px'}}/>
                    Shkycu
                </button>
            </div>
        </div>
    )
}

export default observer(UserSidebar);