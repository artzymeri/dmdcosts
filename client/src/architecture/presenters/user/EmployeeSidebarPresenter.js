import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";
import {HomeRounded, MailRounded, SendRounded} from "@mui/icons-material";

@injectable()
class EmployeeSidebarPresenter {

    vm = {
        sidebarItems: [
            {
                id: 1,
                title: 'Dashboard',
                route: '/',
                pathName: '/',
                icon: <HomeRounded sx={{height: '18px', width: '18px'}}/>
            },
            {
                id: 2,
                title: 'Porositë Tuaja',
                route: '/porosite',
                pathName: '/porosite',
                icon: <MailRounded sx={{height: '18px', width: '18px'}}/>
            },
            {
                id: 3,
                title: 'Bëj Porosi',
                route: '/bejporosi',
                pathName: '/bejporosi',
                icon: <SendRounded sx={{height: '18px', width: '18px'}}/>
            },
        ]
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
        });
    }

    async logout() {
        await Cookies.remove("userToken")
    }

    get sidebarItems() {
        return this.vm.sidebarItems
    }

}

export default EmployeeSidebarPresenter;