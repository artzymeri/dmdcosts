import {inject, injectable} from "inversify";
import {TYPES} from "@/architecture/ioc/types"
import "reflect-metadata";
import {action, computed, makeObservable, observable} from "mobx";


@injectable()
class MainAppRepository {
    @inject(TYPES.AppGateway) appGateway

    constructor() {
        makeObservable(this, {
            registerUser: action.bound
        });
    }

    //functions

    registerUser = async (employee_data_object) => {
        return await this.appGateway.registerUser(employee_data_object);
    }

    loginByEmail = async (employee_data_object) => {
        return await this.appGateway.loginByEmail(employee_data_object);
    }

    getEmployeesData = async () => {
        return await this.appGateway.getEmployeesData();
    }

    deleteEmployee = async (employee_id) => {
        return await this.appGateway.deleteEmployee(employee_id);
    }

    createCase = async (case_object) => {
        return await this.appGateway.createCase(case_object);
    }

    deleteCase = async (case_id) => {
        return await this.appGateway.deleteCase(case_id);
    }

    getAllCases = async () => {
        return await this.appGateway.getAllCases();
    }

    getCaseDetails = async (employee_id ,case_id) => {
        return await this.appGateway.getCaseDetails(employee_id ,case_id);
    }

    getCaseDetailsAsAdmin = async (case_id) => {
        return await this.appGateway.getCaseDetailsAsAdmin(case_id);
    }

}

export default MainAppRepository;