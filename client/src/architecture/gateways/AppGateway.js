import axios from "axios";
import { injectable } from "inversify";
import Cookies from "js-cookie";
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

  editCase = async (case_object) => {
    return await axios.post("http://localhost:7070/editcase", case_object);
  };

  deleteCase = async (case_id) => {
    return await axios.post(`http://localhost:7070/deletecase${case_id}`);
  };

  changeCaseStatus = async (case_id, status, date) => {
    return await axios.post(
      `http://localhost:7070/changecasestatus${case_id}`,
      { status, date }
    );
  };

  addNewCaseOffer = async (
    case_id,
    new_offer_date,
    new_offer_value,
    formality,
    pod_due_date,
    type,
    offer_id,
    first_offer
  ) => {
    return await axios.post(`http://localhost:7070/addnewcaseoffer${case_id}`, {
      new_offer_date,
      new_offer_value,
      formality,
      pod_due_date,
      type,
      offer_id,
      first_offer,
    });
  };

  deleteCaseOffer = async (case_id, offer_id) => {
    return await axios.post(
      `http://localhost:7070/delete-case-offer${case_id}`,
      {
        offer_id,
      }
    );
  };

  changeCasePODStatus = async (case_id, boolean) => {
    return await axios.post(
      `http://localhost:7070/change-case-pod-status${case_id}`,
      {
        boolean,
      }
    );
  };

  extendCasePodDueDate = async (case_id, date) => {
    return await axios.post(
      `http://localhost:7070/extend-pod-due-date${case_id}`,
      {
        date,
      }
    );
  };

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

  insertInvoiceToDatabase = async (cases_array, admin_id, client_id) => {
    return await axios.post(
      `http://localhost:7070/insert-invoices${admin_id}`,
      { cases_array, client_id }
    );
  };

  getAllInvoices = async () => {
    return await axios.get(`http://localhost:7070/allinvoices`);
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

  produceSingleInvoices = async (cases_involved) => {
    const admin = JSON.parse(Cookies.get("employeeData"));
    return await axios.post(`http://localhost:7070/produce-single-invoices`, {
      cases_involved,
      admin_id: admin?.id,
    });
  };

  produceBundleInvoices = async (client_id, cases_involved) => {
    const admin = JSON.parse(Cookies.get("employeeData"));
    return await axios.post(
      `http://localhost:7070/produce-bundle-invoices${client_id}`,
      { cases_involved, admin_id: admin?.id }
    );
  };
}

export default AppGateway;
