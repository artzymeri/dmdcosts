import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, observable, computed } from "mobx";
import Cookies from "js-cookie";
import { HomeRounded, MailRounded } from "@mui/icons-material";

@injectable()
class EmployeeSidebarPresenter {
  vm = {
    sidebarItems: [
      {
        id: 1,
        title: "Dashboard",
        route: "/",
        pathName: "/",
        icon: <HomeRounded sx={{ height: "18px", width: "18px" }} />,
      },
      {
        id: 2,
        title: "Assigned Cases",
        route: "/cases",
        pathName: "/cases",
        icon: <MailRounded sx={{ height: "18px", width: "18px" }} />,
      },
    ],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
    });
  }

  async logout() {
    await Cookies.remove("employeeToken");
  }

  get sidebarItems() {
    return this.vm.sidebarItems;
  }
}

export default EmployeeSidebarPresenter;
