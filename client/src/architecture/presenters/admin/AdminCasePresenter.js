import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class AdminCasePresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        case_details: null,
        refresh_state: 1,
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getCaseDetailsAsAdmin: action.bound,
            caseDetails: computed
        });
    }

    getCaseDetailsAsAdmin = async (case_id) => {
        const response = await this.mainAppRepository.getCaseDetailsAsAdmin(case_id);
        this.vm.case_details = response.data;
    }

    cancelOrder = async (case_id) => {
        const response = await this.mainAppRepository.cancelCase(case_id);
        this.vm.refresh_state += 1;
        return response;
    }

    get caseDetails() {
        return this.vm.case_details?.case;
    }

}

export default AdminCasePresenter;