import {inject, injectable} from "inversify";
import {TYPES} from "@/architecture/ioc/types"
import "reflect-metadata";
import {action, computed, makeObservable, observable} from "mobx";


@injectable()
class MainAppRepository {
    @inject(TYPES.UserGateway) userGateway

    constructor() {
        makeObservable(this, {
            registerUser: action.bound
        });
    }

    //functions

    registerUser = async (user_data_object) => {
        return await this.userGateway.registerUser(user_data_object);
    }

    loginByEmail = async (user_data_object) => {
        return await this.userGateway.loginByEmail(user_data_object);
    }

    loginByPhone = async (user_data_object) => {
        return await this.userGateway.loginByPhone(user_data_object);
    }

    getKlientetData = async () => {
        return await this.userGateway.getKlientetData();
    }

    getDriversData = async () => {
        return await this.userGateway.getDriversData();
    }

    getCollectorsData = async () => {
        return await this.userGateway.getCollectorsData();
    }

    deleteUser = async (user_id) => {
        return await this.userGateway.deleteUser(user_id);
    }

    createOrder = async (order_object) => {
        return await this.userGateway.createOrder(order_object);
    }

    deleteOrder = async (order_id) => {
        return await this.userGateway.deleteOrder(order_id);
    }

    cancelOrder = async (order_id) => {
        return await this.userGateway.cancelOrder(order_id);
    }

    getAllOrders = async () => {
        return await this.userGateway.getAllOrders();
    }

    getClientOrders = async (client_id) => {
        return await this.userGateway.getClientOrders(client_id);
    }

    getOrderDetails = async (user_id ,order_id) => {
        return await this.userGateway.getOrderDetails(user_id ,order_id);
    }

    getOrderDetailsAsAdmin = async (order_id) => {
        return await this.userGateway.getOrderDetailsAsAdmin(order_id);
    }

    addTransport = async (transport_details_object) => {
        return await this.userGateway.addTransport(transport_details_object);
    }

    getAllTransports = async () => {
        return await this.userGateway.getAllTransports();
    }

    deleteTransport = async (transport_id) => {
        return await this.userGateway.deleteTransport(transport_id);
    }

}

export default MainAppRepository;