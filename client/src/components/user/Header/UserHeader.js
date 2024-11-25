import {observer} from "mobx-react-lite";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {useEffect, useState} from "react";
import UserHeaderNotificationsMenu from "@/components/user/Header/UserHeaderNotificationsMenu";
import UserHeaderSettingsMenu from "@/components/user/Header/UserHeaderSettingsMenu";


const UserHeader = () => {

    let presenter = container.get(TYPES.UserHeaderPresenter);

    useEffect(() => {
        presenter.getUserData().then(() => {
        });
    }, [presenter]);

    return (
        <div className="user-header-container">
            <div className="user-header-name-container">
                <span>Mirësevjen</span>
                <span>{presenter?.userData?.name_surname}</span>
            </div>
            <div className="user-header-icons-container">
                <UserHeaderNotificationsMenu />
                <div className="user-header-icons-divider"></div>
                <UserHeaderSettingsMenu />
            </div>
        </div>
    )
}

export default observer(UserHeader);