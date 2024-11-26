import {observer} from "mobx-react-lite";
import UserCaseTitle from "@/components/employee/Cases/Case/EmployeeCaseTitle";
import UserCaseDetailsLeftSide from "@/components/employee/Cases/Case/EmployeeCaseDetailsLeftSide";
import UserCaseDetailsRightSide from "@/components/employee/Cases/Case/EmployeeCaseDetailsRightSide";

const EmployeeCaseView = ({presenter}) => {

    return (
        <div className="employee-case-content-container">
            <UserCaseTitle presenter={presenter}/>
            <div className="employee-case-details-container">
                <UserCaseDetailsLeftSide presenter={presenter}/>
                <div className="employee-case-details-middle"></div>
                <UserCaseDetailsRightSide presenter={presenter}/>
            </div>
        </div>
    );
};

export default observer(EmployeeCaseView);
