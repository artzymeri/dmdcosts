import { LogoutRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const EmployeeSidebar = () => {
  const router = useRouter();
  const [presenter, setPresenter] = useState(
    container.get(TYPES.EmployeeSidebarPresenter)
  );

  return (
    <div className="employee-sidebar-container">
      <div className="employee-sidebar-logo-container">
        <img src="/dmd_logo.png" />
      </div>
      <div className="employee-sidebar-items-container">
        {presenter?.sidebarItems.map((item) => {
          return (
            <div
              key={item?.id}
              className={`${
                item.pathName == router.route
                  ? "employee-sidebar-item-selected"
                  : "employee-sidebar-item"
              }`}
              onClick={() => {
                router.push(item?.route);
              }}
            >
              {item?.icon}
              {item?.title}
            </div>
          );
        })}
      </div>
      <div className="employee-sidebar-logout-container">
        <button
          className="employee-sidebar-logout-button"
          onClick={() => {
            presenter.logout().then(() => {
              router.push("/login");
            });
          }}
        >
          <LogoutRounded sx={{ height: "18px", width: "18px" }} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default observer(EmployeeSidebar);
