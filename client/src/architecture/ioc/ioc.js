import { Container } from "inversify";
import { TYPES } from "@/architecture/ioc/types";

import MainAppRepository from "@/architecture/repositories/MainAppRepository";
import LoginRegisterPresenter from "../presenters/LoginPresenter";
import AdminSidebarPresenter from "@/architecture/presenters/admin/AdminSidebarPresenter";
import AdminHeaderPresenter from "@/architecture/presenters/admin/AdminHeaderPresenter";
import AdminDashboardPresenter from "@/architecture/presenters/admin/AdminDashboardPresenter";
import EmployeeSidebarPresenter from "@/architecture/presenters/employee/EmployeeSidebarPresenter";
import EmployeeAddCasePresenter from "@/architecture/presenters/employee/EmployeeAddCasePresenter";
import EmployeeCasesPresenter from "@/architecture/presenters/employee/EmployeeCasesPresenter";
import EmployeeCasePresenter from "@/architecture/presenters/employee/EmployeeCasePresenter";
import AdminCasesPresenter from "@/architecture/presenters/admin/AdminCasesPresenter";
import AdminCasePresenter from "@/architecture/presenters/admin/AdminCasePresenter";
import AdminEmployeesPresenter from "@/architecture/presenters/admin/AdminEmployeesPresenter";
import AdminAddEmployeePresenter from "@/architecture/presenters/admin/AdminAddEmployeePresenter";
import AppGateway from "@/architecture/gateways/AppGateway";
import EmployeeHeaderPresenter from "@/architecture/presenters/employee/EmployeeHeaderPresenter";
import AdminClientsPresenter from "../presenters/admin/AdminClientsPresenter";
import AdminAddClientPresenter from "../presenters/admin/AdminAddClientPresenter";
import AdminClientViewPresenter from "../presenters/admin/AdminClientViewPresenter";
import AdminAddCasePresenter from "../presenters/admin/AdminAddCasePresenter";
import InvoicesPresenter from "../presenters/admin/InvoicesPresenter";

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Transient",
});

//Gateways
container.bind(TYPES.AppGateway).toDynamicValue((context) => {
  return new AppGateway();
});

//Repositories
container
  .bind(TYPES.MainAppRepository)
  .to(MainAppRepository)
  .inSingletonScope();

// Presenters
container
  .bind(TYPES.LoginRegisterPresenter)
  .to(LoginRegisterPresenter)
  .inSingletonScope();

//Employee
container.bind(TYPES.EmployeeSidebarPresenter).to(EmployeeSidebarPresenter);
container.bind(TYPES.EmployeeAddCasePresenter).to(EmployeeAddCasePresenter);
container.bind(TYPES.EmployeeCasesPresenter).to(EmployeeCasesPresenter);
container.bind(TYPES.EmployeeCasePresenter).to(EmployeeCasePresenter);
container
  .bind(TYPES.EmployeeHeaderPresenter)
  .to(EmployeeHeaderPresenter)
  .inSingletonScope();

//Admin
container.bind(TYPES.AdminSidebarPresenter).to(AdminSidebarPresenter);
container.bind(TYPES.AdminDashboardPresenter).to(AdminDashboardPresenter);
container.bind(TYPES.AdminEmployeesPresenter).to(AdminEmployeesPresenter);
container.bind(TYPES.AdminCasesPresenter).to(AdminCasesPresenter);
container.bind(TYPES.AdminClientsPresenter).to(AdminClientsPresenter);
container.bind(TYPES.AdminClientViewPresenter).to(AdminClientViewPresenter);
container.bind(TYPES.AdminAddClientPresenter).to(AdminAddClientPresenter);
container.bind(TYPES.AdminAddCasePresenter).to(AdminAddCasePresenter);
container.bind(TYPES.AdminCasePresenter).to(AdminCasePresenter);
container.bind(TYPES.AdminAddEmployeePresenter).to(AdminAddEmployeePresenter);
container.bind(TYPES.InvoicesPresenter).to(InvoicesPresenter);
container
  .bind(TYPES.AdminHeaderPresenter)
  .to(AdminHeaderPresenter)
  .inSingletonScope();
