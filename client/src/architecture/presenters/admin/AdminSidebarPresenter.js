import {injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";
import {
    DirectionsCarRounded,
    DryRounded,
    HomeRounded,
    LocalShippingRounded,
    MailRounded,
    Person2Rounded
} from "@mui/icons-material";

@injectable()
class AdminSidebarPresenter {

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
                title: 'Klientët',
                route: '/klientet',
                pathName: '/kliente',
                icon: <Person2Rounded sx={{height: '18px', width: '18px'}}/>
            },
            {
                id: 3,
                title: 'Porositë',
                route: '/cases',
                pathName: '/cases',
                icon: <MailRounded sx={{height: '18px', width: '18px'}}/>
            },
            {
                id: 4,
                title: 'Shoferët',
                route: '/shoferet',
                pathName: '/shoferet',
                icon: <LocalShippingRounded sx={{height: '18px', width: '18px'}}/>
            },
            {
                id: 5,
                title: 'Mbledhësit',
                route: '/mbledhesit',
                pathName: '/mbledhesit',
                icon: <DryRounded sx={{height: '18px', width: '18px'}}/>
            },
            {
                id: 6,
                title: 'Automjetet',
                route: '/automjetet',
                pathName: '/automjetet',
                icon: <DirectionsCarRounded sx={{height: '18px', width: '18px'}}/>
            }
        ]
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
        });
    }

    async logout() {
        await Cookies.remove("adminToken")
    }

    get sidebarItems() {
        return this.vm.sidebarItems
    }

}

export default AdminSidebarPresenter;