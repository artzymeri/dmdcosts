import {observer} from "mobx-react-lite";
import {useEffect, useMemo} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import AdminCasesHeader from "@/components/admin/Cases/Cases/AdminCasesHeader";
import AdminCasesList from "@/components/admin/Cases/Cases/AdminCasesList";
import AdminSecondHeader from "@/components/admin/Cases/Cases/AdminCasesSecondHeader";


const AdminCasesContent = () => {

    const presenter = useMemo(() => container.get(TYPES.AdminCasesPresenter), []);

    useEffect(() => {
        presenter.getAllCases();
    },[]);

    return (
        <div className="admin-cases-content-container">
            <div className="admin-cases-content-title-container">
                <h2>
                    Cases
                </h2>
            </div>
            <AdminCasesHeader presenter={presenter}/>
            <AdminSecondHeader presenter={presenter}/>
            <AdminCasesList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminCasesContent);