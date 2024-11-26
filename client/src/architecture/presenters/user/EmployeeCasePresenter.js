import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class EmployeeCasePresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        case_details: null,
        refresh_state: 1,
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getOrderDetails: action.bound,
            caseDetails: computed
        });
    }

    getCaseDetails = async (user_id, case_id) => {
        const response = await this.mainAppRepository.getCaseDetails(user_id ,case_id);
        this.vm.case_details = response.data;
    }

    cancelCase = async (case_id) => {
        const response = await this.mainAppRepository.cancelCase(case_id);
        this.vm.refresh_state += 1;
        return response;
    }

    get caseDetails() {
        return this.vm.case_details?.case;
    }

}

export default EmployeeCasePresenter;