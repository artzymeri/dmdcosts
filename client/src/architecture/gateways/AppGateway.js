import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class AppGateway {
  registerUser = async (user_data) => {
    return await axios.post("http://localhost:8080/registeruser", user_data);
  };

  login = async (user_data) => {
    return await axios.post("http://localhost:8080/login", user_data);
  };

  getEmployeesData = async () => {
    return await axios.get("http://localhost:8080/employees");
  };

  deleteEmployee = async (employee_id) => {
    return await axios.post(
      `http://localhost:8080/deleteemployee${employee_id}`
    );
  };

  createCase = async (case_object) => {
    return await axios.post("http://localhost:8080/createcase", case_object);
  };

  deleteCase = async (case_id) => {
    return await axios.post(`http://localhost:8080/deletecase${case_id}`);
  };

  getAllCases = async () => {
    return await axios.get(`http://localhost:8080/allcases`);
  };

  getCaseDetails = async (employee_id, case_id) => {
    return await axios.get(
      `http://localhost:8080/employees/${employee_id}/cases/${case_id}`
    );
  };

  getCaseDetailsAsAdmin = async (case_id) => {
    return await axios.get(`http://localhost:8080/case${case_id}`);
  };
}

export default AppGateway;
