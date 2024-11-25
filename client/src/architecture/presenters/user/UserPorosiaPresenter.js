import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class UserPorosiaPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        order_details: null,
        refresh_state: 1,
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getOrderDetails: action.bound,
            orderDetails: computed
        });
    }

    getOrderDetails = async (user_id, order_id) => {
        const response = await this.mainAppRepository.getOrderDetails(user_id ,order_id);
        this.vm.order_details = response.data;
    }

    cancelOrder = async (order_id) => {
        const response = await this.mainAppRepository.cancelOrder(order_id);
        this.vm.refresh_state += 1;
        return response;
    }

    get orderDetails() {
        return this.vm.order_details?.order;
    }

}

export default UserPorosiaPresenter;