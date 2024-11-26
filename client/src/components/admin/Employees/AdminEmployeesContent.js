import {useEffect, useState} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import AdminEmployeesHeader from "@/components/admin/Employees/AdminEmployeesHeader";
import AdminEmployeesList from "@/components/admin/Employees/AdminEmployeesList";

const AdminEmployeesContent = () => {

    let presenter = container.get(TYPES.AdminEmployeesPresenter);

    useEffect(() => {
        presenter.getEmployeesData()
    },[]);


    return (
        <div className="admin-employees-content-container">
            <h2>
                Employees
            </h2>
            <AdminEmployeesHeader presenter={presenter}/>
            <AdminEmployeesList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminEmployeesContent);