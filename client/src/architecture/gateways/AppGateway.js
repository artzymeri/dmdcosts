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

  getAllEmployees = async () => {
    return await axios.get("http://localhost:8080/allemployees");
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

  changeCaseStatus = async (case_id, status) => {
    return await axios.post(`http://localhost:8080/changecasestatus${case_id}`, { status });
  };

  changeCasePayment = async (case_id, boolean) => {
    console.log(case_id, boolean)
    return await axios.post(`http://localhost:8080/changecasepayment${case_id}`, { boolean });
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

  getAllClients = async () => {
    return await axios.get(`http://localhost:8080/allclients`);
  };

  addClient = async (client_data) => {
    return await axios.post("http://localhost:8080/addclient", client_data);
  };

  saveEditedClient = async (client_id, edited_client_data) => {
    return await axios.post(
      `http://localhost:8080/updateclient${client_id}`,
      edited_client_data
    );
  };

  deleteClient = async (client_id) => {
    return await axios.post(`http://localhost:8080/deleteclient${client_id}`);
  };

  getClientDetails = async (client_id) => {
    return await axios.get(`http://localhost:8080/client${client_id}`);
  };
}

export default AppGateway;
