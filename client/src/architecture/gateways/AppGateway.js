import axios from "axios";
import { injectable } from "inversify";
import Cookies from "js-cookie";
import "reflect-metadata";

const BASE_URL = `https://dmdcosts.onrender.com`;

@injectable()
class AppGateway {
  registerUser = async (user_data) => {
    return await axios.post(`${BASE_URL}/registeruser`, user_data);
  };

  login = async (user_data) => {
    return await axios.post(`${BASE_URL}/login`, user_data);
  };

  saveEditUserDetails = async (edit_user_data) => {
    return await axios.post(`${BASE_URL}/edit-user-data`, {
      edit_user_data,
    });
  };

  saveChangeUserPassword = async (user_id, new_password) => {
    return await axios.post(`${BASE_URL}/change-user-password${user_id}`, {
      new_password,
    });
  };

  getAllEmployees = async () => {
    return await axios.get(`${BASE_URL}/allemployees`);
  };

  deleteEmployee = async (employee_id) => {
    return await axios.post(`${BASE_URL}/deleteemployee${employee_id}`);
  };

  createCase = async (case_object) => {
    return await axios.post(`${BASE_URL}/createcase`, case_object);
  };

  editCase = async (case_object) => {
    return await axios.post(`${BASE_URL}/editcase`, case_object);
  };

  deleteCase = async (case_id) => {
    return await axios.post(`${BASE_URL}/deletecase${case_id}`);
  };

  deleteInvoice = async (invoice_id) => {
    return await axios.post(`${BASE_URL}/delete-invoice${invoice_id}`);
  };

  changeCaseStatus = async (case_id, status, date) => {
    return await axios.post(`${BASE_URL}/changecasestatus${case_id}`, {
      status,
      date,
    });
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
    return await axios.post(`${BASE_URL}/addnewcaseoffer${case_id}`, {
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
    return await axios.post(`${BASE_URL}/delete-case-offer${case_id}`, {
      offer_id,
    });
  };

  changeCasePODStatus = async (
    case_id,
    boolean,
    pod_checked_date,
    pod_replies_due_date
  ) => {
    return await axios.post(`${BASE_URL}/change-case-pod-status${case_id}`, {
      boolean,
      pod_checked_date,
      pod_replies_due_date,
    });
  };

  extendCasePodDueDate = async (case_id, date) => {
    return await axios.post(`${BASE_URL}/extend-pod-due-date${case_id}`, {
      date,
    });
  };

  getAllCases = async () => {
    return await axios.get(`${BASE_URL}/allcases`);
  };

  getAllAssignedCases = async (user_id) => {
    return await axios.get(`${BASE_URL}/all_assigned_cases`, {
      params: { user_id },
    });
  };

  getCaseDetails = async (employee_id, case_id) => {
    return await axios.get(
      `${BASE_URL}/employees/${employee_id}/cases/${case_id}`
    );
  };

  getCaseInvoice = async (case_id) => {
    return await axios.get(`${BASE_URL}/invoice-case${case_id}`);
  };

  getCaseDetailsAsAdmin = async (case_id) => {
    return await axios.get(`${BASE_URL}/case${case_id}`);
  };

  getCaseDetailsAsEmployee = async (case_id, user_id) => {
    return await axios.get(`${BASE_URL}/case_details_as_employee${case_id}`, {
      user_id: user_id,
    });
  };

  insertInvoiceToDatabase = async (cases_array, admin_id, client_id) => {
    return await axios.post(`${BASE_URL}/insert-invoices${admin_id}`, {
      cases_array,
      client_id,
    });
  };

  getAllInvoices = async () => {
    return await axios.get(`${BASE_URL}/allinvoices`);
  };

  getAllClients = async () => {
    return await axios.get(`${BASE_URL}/allclients`);
  };

  addClient = async (client_data) => {
    return await axios.post(`${BASE_URL}/addclient`, client_data);
  };

  saveEditedClient = async (client_id, edited_client_data) => {
    return await axios.post(
      `${BASE_URL}/updateclient${client_id}`,
      edited_client_data
    );
  };

  deleteClient = async (client_id) => {
    return await axios.post(`${BASE_URL}/deleteclient${client_id}`);
  };

  getClientDetails = async (client_id) => {
    return await axios.get(`${BASE_URL}/client${client_id}`);
  };

  produceSingleInvoices = async (cases_involved) => {
    const admin = JSON.parse(Cookies.get(`employeeData`));
    return await axios.post(`${BASE_URL}/produce-single-invoices`, {
      cases_involved,
      admin_id: admin?.id,
    });
  };

  produceBundleInvoices = async (client_id, cases_involved) => {
    const admin = JSON.parse(Cookies.get(`employeeData`));
    return await axios.post(`${BASE_URL}/produce-bundle-invoices${client_id}`, {
      cases_involved,
      admin_id: admin?.id,
    });
  };
}

export default AppGateway;
