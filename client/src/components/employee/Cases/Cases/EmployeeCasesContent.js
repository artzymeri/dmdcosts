import {observer} from "mobx-react-lite";
import UserCasesHeader from "@/components/employee/Cases/Cases/EmployeeCasesHeader";
import UserCasesList from "@/components/employee/Cases/Cases/EmployeeCasesList";
import {useEffect, useMemo} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {Button} from "@mui/material";
import {useRouter} from "next/router";


const EmployeeCasesContent = () => {

    const router = useRouter()

    const presenter = useMemo(() => container.get(TYPES.UserCasesPresenter), []);

    useEffect(() => {
        presenter.getClientOrders();
    }, []);

    return (
        <div className="employee-cases-content-container">
            <div className="employee-cases-content-title-container">
                <h2>
                    Porositë tuaja
                </h2>
                <Button variant="contained" onClick={() => {router.push('/bejporosi')}}>
                    Bëj Porosi
                </Button>
            </div>
            <UserCasesHeader presenter={presenter}/>
            <UserCasesList presenter={presenter}/>
        </div>
    )
}

export default observer(EmployeeCasesContent);