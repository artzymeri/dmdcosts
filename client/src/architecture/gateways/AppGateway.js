import axios from "axios";
import {injectable} from "inversify";
import "reflect-metadata";


@injectable()
class AppGateway {
    registerUser = async (user_data_object) => {
        return await axios.post('http://localhost:8080/registeruser', user_data_object);
    }

    loginByEmail = async (user_data_object) => {
        return await axios.post('http://localhost:8080/loginbyemail', user_data_object);
    }

    getEmployeesData = async () => {
        return await axios.get('http://localhost:8080/employees');
    }

    deleteEmployee = async (employee_id) => {
        return await axios.post(`http://localhost:8080/deleteemployee${employee_id}`);
    }

    createCase = async (case_object) => {
        return await axios.post('http://localhost:8080/createcase', case_object);
    }

    deleteCase = async (case_id) => {
        return await axios.post(`http://localhost:8080/deletecase${case_id}`)
    }

    getAllCases = async () => {
        return await axios.get(`http://localhost:8080/allcases`);
    }

    getCaseDetails = async (user_id, case_id) => {
        return await axios.get(`http://localhost:8080/users/${user_id}/cases/${case_id}`);
    };

    getCaseDetailsAsAdmin = async (case_id) => {
        return await axios.get(`http://localhost:8080/case${case_id}`);
    };

}

export default AppGateway;
