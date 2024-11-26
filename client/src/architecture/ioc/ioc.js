import { Container } from 'inversify'
import {TYPES} from "@/architecture/ioc/types";

import MainAppRepository from "@/architecture/repositories/MainAppRepository";
import LoginRegisterPresenter from '../presenters/LoginRegisterPresenter';
import AdminSidebarPresenter from "@/architecture/presenters/admin/AdminSidebarPresenter";
import AdminHeaderPresenter from "@/architecture/presenters/admin/AdminHeaderPresenter";
import AdminDashboardPresenter from "@/architecture/presenters/admin/AdminDashboardPresenter";
import EmployeeSidebarPresenter from "@/architecture/presenters/user/EmployeeSidebarPresenter";
import EmployeeAddCasePresenter from "@/architecture/presenters/user/EmployeeAddCasePresenter";
import EmployeeCasesPresenter from "@/architecture/presenters/user/EmployeeCasesPresenter";
import EmployeeCasePresenter from "@/architecture/presenters/user/EmployeeCasePresenter";
import AdminCasesPresenter from "@/architecture/presenters/admin/AdminCasesPresenter";
import AdminCasePresenter from "@/architecture/presenters/admin/AdminCasePresenter";
import AdminEmployeesPresenter from "@/architecture/presenters/admin/AdminEmployeesPresenter";
import AdminAddEmployeePresenter from "@/architecture/presenters/admin/AdminAddEmployeePresenter";
import AppGateway from "@/architecture/gateways/AppGateway";
import EmployeeHeaderPresenter from "@/architecture/presenters/user/EmployeeHeaderPresenter";

export const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Transient'
})

//Gateways
container.bind(TYPES.AppGateway).toDynamicValue((context) => {
    return new AppGateway();
})

//Repositories
container.bind(TYPES.MainAppRepository).to(MainAppRepository).inSingletonScope()

// Presenters
container.bind(TYPES.LoginRegisterPresenter).to(LoginRegisterPresenter).inSingletonScope()

//User
container.bind(TYPES.EmployeeSidebarPresenter).to(EmployeeSidebarPresenter)
container.bind(TYPES.EmployeeAddCasePresenter).to(EmployeeAddCasePresenter)
container.bind(TYPES.EmployeeCasesPresenter).to(EmployeeCasesPresenter)
container.bind(TYPES.EmployeeCasePresenter).to(EmployeeCasePresenter)
container.bind(TYPES.EmployeeHeaderPresenter).to(EmployeeHeaderPresenter).inSingletonScope()

//Admin
container.bind(TYPES.AdminSidebarPresenter).to(AdminSidebarPresenter)
container.bind(TYPES.AdminDashboardPresenter).to(AdminDashboardPresenter)
container.bind(TYPES.AdminEmployeesPresenter).to(AdminEmployeesPresenter)
container.bind(TYPES.AdminCasesPresenter).to(AdminCasesPresenter)
container.bind(TYPES.AdminCasePresenter).to(AdminCasePresenter)
container.bind(TYPES.AdminAddEmployeePresenter).to(AdminAddEmployeePresenter)
container.bind(TYPES.AdminHeaderPresenter).to(AdminHeaderPresenter).inSingletonScope()


