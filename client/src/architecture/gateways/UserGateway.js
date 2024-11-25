import axios from "axios";
import {injectable} from "inversify";
import "reflect-metadata";


@injectable()
class UserGateway {
    registerUser = async (user_data_object) => {
        return await axios.post('http://localhost:8080/registeruser', user_data_object);
    }

    loginByEmail = async (user_data_object) => {
        return await axios.post('http://localhost:8080/loginbyemail', user_data_object);
    }

    loginByPhone = async (user_data_object) => {
        return await axios.post('http://localhost:8080/loginbyphone', user_data_object);
    }

    getKlientetData = async () => {
        return await axios.get('http://localhost:8080/klientet');
    }

    getDriversData = async () => {
        return await axios.get('http://localhost:8080/drivers');
    }

    getCollectorsData = async () => {
        return await axios.get('http://localhost:8080/collectors');
    }

    deleteUser = async (user_id) => {
        return await axios.post(`http://localhost:8080/deleteuser${user_id}`);
    }

    createOrder = async (order_object) => {
        return await axios.post('http://localhost:8080/createorder', order_object);
    }

    cancelOrder = async (order_id) => {
        return await axios.post(`http://localhost:8080/cancelorder${order_id}`);
    }

    deleteOrder = async (order_id) => {
        return await axios.post(`http://localhost:8080/deleteorder${order_id}`)
    }

    getAllOrders = async () => {
        return await axios.get(`http://localhost:8080/allorders`);
    }

    getClientOrders = async (client_id) => {
        return await axios.get(`http://localhost:8080/orders${client_id}`);
    }

    getOrderDetails = async (user_id, order_id) => {
        return await axios.get(`http://localhost:8080/users/${user_id}/orders/${order_id}`);
    };

    getOrderDetailsAsAdmin = async (order_id) => {
        return await axios.get(`http://localhost:8080/order${order_id}`);
    };

    addTransport = async (transport_details_object) => {
        return await axios.post('http://localhost:8080/addtransport', transport_details_object);
    }

    getAllTransports = async () => {
        return await axios.get('http://localhost:8080/alltransports');
    }

    deleteTransport = async (transport_id) => {
        return await axios.post(`http://localhost:8080/deletetransport/${transport_id}`);
    }

}

export default UserGateway;
