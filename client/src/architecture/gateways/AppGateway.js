import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class AppGateway {
  registerUser = async (user_data) => {
    return await axios.post("http://localhost:7070/registeruser", user_data);
  };

  login = async (user_data) => {
    return await axios.post("http://localhost:7070/login", user_data);
  };

  getAllEmployees = async () => {
    return await axios.get("http://localhost:7070/allemployees");
  };

  deleteEmployee = async (employee_id) => {
    return await axios.post(
      `http://localhost:7070/deleteemployee${employee_id}`
    );
  };

  createCase = async (case_object) => {
    return await axios.post("http://localhost:7070/createcase", case_object);
  };

  deleteCase = async (case_id) => {
    return await axios.post(`http://localhost:7070/deletecase${case_id}`);
  };

  changeCaseStatus = async (case_id, status) => {
    return await axios.post(
      `http://localhost:7070/changecasestatus${case_id}`,
      { status }
    );
  };

  addNewCaseOffer = async (
    case_id,
    new_offer_date,
    new_offer_value,
    formality,
    type,
    offer_id,
    first_offer
  ) => {
    return await axios.post(`http://localhost:7070/addnewcaseoffer${case_id}`, {
      new_offer_date,
      new_offer_value,
      formality,
      type,
      offer_id,
      first_offer
    });
  };

  deleteCaseOffer = async (case_id, offer_id) => {
    return await axios.post(`http://localhost:7070/delete-case-offer${case_id}`, {
      offer_id,
    });
  };

  changeCasePODStatus = async (case_id, boolean) => {
    return await axios.post(`http://localhost:7070/change-case-pod-status${case_id}`, {
      boolean,
    });
  }

  getAllCases = async () => {
    return await axios.get(`http://localhost:7070/allcases`);
  };

  getCaseDetails = async (employee_id, case_id) => {
    return await axios.get(
      `http://localhost:7070/employees/${employee_id}/cases/${case_id}`
    );
  };

  getCaseDetailsAsAdmin = async (case_id) => {
    return await axios.get(`http://localhost:7070/case${case_id}`);
  };

  getAllClients = async () => {
    return await axios.get(`http://localhost:7070/allclients`);
  };

  addClient = async (client_data) => {
    return await axios.post("http://localhost:7070/addclient", client_data);
  };

  saveEditedClient = async (client_id, edited_client_data) => {
    return await axios.post(
      `http://localhost:7070/updateclient${client_id}`,
      edited_client_data
    );
  };

  deleteClient = async (client_id) => {
    return await axios.post(`http://localhost:7070/deleteclient${client_id}`);
  };

  getClientDetails = async (client_id) => {
    return await axios.get(`http://localhost:7070/client${client_id}`);
  };
}

export default AppGateway;
