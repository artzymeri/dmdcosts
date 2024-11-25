import { Container } from 'inversify'
import {TYPES} from "@/architecture/ioc/types";

import UserGateway from "@/architecture/gateways/UserGateway";
import MainAppRepository from "@/architecture/repositories/MainAppRepository";
import LoginRegisterPresenter from '../presenters/LoginRegisterPresenter';
import AdminSidebarPresenter from "@/architecture/presenters/admin/AdminSidebarPresenter";
import AdminHeaderPresenter from "@/architecture/presenters/admin/AdminHeaderPresenter";
import AdminBallinaPresenter from "@/architecture/presenters/admin/AdminBallinaPresenter";
import AdminKlientetPresenter from "@/architecture/presenters/admin/AdminKlientetPresenter";
import UserSidebarPresenter from "@/architecture/presenters/user/UserSidebarPresenter";
import UserHeaderPresenter from "@/architecture/presenters/user/UserHeaderPresenter";
import UserBejPorosiPresenter from "@/architecture/presenters/user/UserBejPorosiPresenter";
import UserPorositePresenter from "@/architecture/presenters/user/UserPorositePresenter";
import UserPorosiaPresenter from "@/architecture/presenters/user/UserPorosiaPresenter";
import AdminPorositePresenter from "@/architecture/presenters/admin/AdminPorositePresenter";
import AdminPorosiaPresenter from "@/architecture/presenters/admin/AdminPorosiaPresenter";
import AdminShoferetPresenter from "@/architecture/presenters/admin/AdminShoferetPresenter";
import AdminShtoAutomjetPresenter from "@/architecture/presenters/admin/AdminShtoAutomjetPresenter";
import AdminAutomjetetPresenter from "@/architecture/presenters/admin/AdminAutomjetetPresenter";
import AdminShtoShoferPresenter from "@/architecture/presenters/admin/AdminShtoShoferPresenter";

export const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Transient'
})

//Gateways
container.bind(TYPES.UserGateway).toDynamicValue((context) => {
    return new UserGateway();
})

//Repositories
container.bind(TYPES.MainAppRepository).to(MainAppRepository).inSingletonScope()

// Presenters
container.bind(TYPES.LoginRegisterPresenter).to(LoginRegisterPresenter).inSingletonScope()

//User
container.bind(TYPES.UserSidebarPresenter).to(UserSidebarPresenter)
container.bind(TYPES.UserBejPorosiPresenter).to(UserBejPorosiPresenter)
container.bind(TYPES.UserPorositePresenter).to(UserPorositePresenter)
container.bind(TYPES.UserPorosiaPresenter).to(UserPorosiaPresenter)
container.bind(TYPES.UserHeaderPresenter).to(UserHeaderPresenter).inSingletonScope()

//Admin
container.bind(TYPES.AdminSidebarPresenter).to(AdminSidebarPresenter)
container.bind(TYPES.AdminBallinaPresenter).to(AdminBallinaPresenter)
container.bind(TYPES.AdminKlientetPresenter).to(AdminKlientetPresenter)
container.bind(TYPES.AdminShoferetPresenter).to(AdminShoferetPresenter)
container.bind(TYPES.AdminAutomjetetPresenter).to(AdminAutomjetetPresenter)
container.bind(TYPES.AdminPorositePresenter).to(AdminPorositePresenter)
container.bind(TYPES.AdminPorosiaPresenter).to(AdminPorosiaPresenter)
container.bind(TYPES.AdminShtoAutomjetPresenter).to(AdminShtoAutomjetPresenter)
container.bind(TYPES.AdminShtoShoferPresenter).to(AdminShtoShoferPresenter)
container.bind(TYPES.AdminHeaderPresenter).to(AdminHeaderPresenter).inSingletonScope()


