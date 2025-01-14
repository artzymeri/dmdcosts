import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { useRouter } from "next/router";
import EmployeeCasesList from "./EmployeeCasesList";
import EmployeeCasesHeader from "./EmployeeCasesHeader";
import EmployeeSecondHeader from "./EmployeeSecondHeader";

const AdminCasesContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.EmployeeCasesPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, []);

  return (
    <div className="admin-cases-content-container">
      <div className="admin-cases-content-title-container">
        <h2>Assigned Cases</h2>
      </div>
      <EmployeeCasesHeader presenter={presenter} />
      <EmployeeSecondHeader presenter={presenter} />
      <EmployeeCasesList presenter={presenter} />
    </div>
  );
};

export default observer(AdminCasesContent);
