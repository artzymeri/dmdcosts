import { injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import Cookies from "js-cookie";
import {
  ArticleRounded,
  ContactPageRounded,
  DescriptionRounded,
  HomeRounded,
  InsertDriveFileRounded,
  PeopleAltRounded,
} from "@mui/icons-material";

@injectable()
class AdminSidebarPresenter {
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
        title: "Clients",
        route: "/clients",
        pathName: "/clients",
        icon: <ContactPageRounded sx={{ height: "18px", width: "18px" }} />,
      },
      {
        id: 3,
        title: "Cases",
        route: "/cases",
        pathName: "/cases",
        icon: <ArticleRounded sx={{ height: "18px", width: "18px" }} />,
      },
      {
        id: 5,
        title: "Employees",
        route: "/employees",
        pathName: "/employees",
        icon: <PeopleAltRounded sx={{ height: "18px", width: "18px" }} />,
      },
      {
        id: 6,
        title: "Invoices",
        route: "/invoices",
        pathName: "/invoices",
        icon: <InsertDriveFileRounded sx={{ height: "18px", width: "18px" }} />,
      },
      {
        id: 7,
        title: "Reports",
        route: "/reports",
        pathName: "/reports",
        icon: <DescriptionRounded sx={{ height: "18px", width: "18px" }} />,
      },
    ],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
    });
  }

  async logout() {
    await Cookies.remove("adminToken");
  }

  get sidebarItems() {
    return this.vm.sidebarItems;
  }
}

export default AdminSidebarPresenter;
