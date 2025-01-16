import axios from "axios";
import { injectable } from "inversify";
import Cookies from "js-cookie";
import "reflect-metadata";

@injectable()
class AppGateway {
  registerUser = async (user_data) => {
    return await axios.post(
      "https://dmdcosts.onrender.com/registeruser",
      user_data
    );
  };

  login = async (user_data) => {
    return await axios.post("https://dmdcosts.onrender.com/login", user_data);
  };

  saveEditUserDetails = async (edit_user_data) => {
    return await axios.post(`https://dmdcosts.onrender.com/edit-user-data`, {
      edit_user_data,
    });
  };

  saveChangeUserPassword = async (user_id, new_password) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/change-user-password${user_id}`,
      {
        new_password,
      }
    );
  };

  getAllEmployees = async () => {
    return await axios.get("https://dmdcosts.onrender.com/allemployees");
  };

  deleteEmployee = async (employee_id) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/deleteemployee${employee_id}`
    );
  };

  createCase = async (case_object) => {
    return await axios.post(
      "https://dmdcosts.onrender.com/createcase",
      case_object
    );
  };

  editCase = async (case_object) => {
    return await axios.post(
      "https://dmdcosts.onrender.com/editcase",
      case_object
    );
  };

  deleteCase = async (case_id) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/deletecase${case_id}`
    );
  };

  deleteInvoice = async (invoice_id) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/delete-invoice${invoice_id}`
    );
  };

  changeCaseStatus = async (case_id, status, date) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/changecasestatus${case_id}`,
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
    return await axios.post(
      `https://dmdcosts.onrender.com/addnewcaseoffer${case_id}`,
      {
        new_offer_date,
        new_offer_value,
        formality,
        pod_due_date,
        type,
        offer_id,
        first_offer,
      }
    );
  };

  deleteCaseOffer = async (case_id, offer_id) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/delete-case-offer${case_id}`,
      {
        offer_id,
      }
    );
  };

  changeCasePODStatus = async (case_id, boolean) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/change-case-pod-status${case_id}`,
      {
        boolean,
      }
    );
  };

  extendCasePodDueDate = async (case_id, date) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/extend-pod-due-date${case_id}`,
      {
        date,
      }
    );
  };

  getAllCases = async () => {
    return await axios.get(`https://dmdcosts.onrender.com/allcases`);
  };

  getAllAssignedCases = async (user_id) => {
    return await axios.get(`https://dmdcosts.onrender.com/all_assigned_cases`, {
      params: { user_id },
    });
  };

  getCaseDetails = async (employee_id, case_id) => {
    return await axios.get(
      `https://dmdcosts.onrender.com/employees/${employee_id}/cases/${case_id}`
    );
  };

  getCaseInvoice = async (case_id) => {
    return await axios.get(
      `https://dmdcosts.onrender.com/invoice-case${case_id}`
    );
  };

  getCaseDetailsAsAdmin = async (case_id) => {
    return await axios.get(`https://dmdcosts.onrender.com/case${case_id}`);
  };

  getCaseDetailsAsEmployee = async (case_id, user_id) => {
    return await axios.get(
      `https://dmdcosts.onrender.com/case_details_as_employee${case_id}`,
      {
        user_id: user_id,
      }
    );
  };

  insertInvoiceToDatabase = async (cases_array, admin_id, client_id) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/insert-invoices${admin_id}`,
      { cases_array, client_id }
    );
  };

  getAllInvoices = async () => {
    return await axios.get(`https://dmdcosts.onrender.com/allinvoices`);
  };

  getAllClients = async () => {
    return await axios.get(`https://dmdcosts.onrender.com/allclients`);
  };

  addClient = async (client_data) => {
    return await axios.post(
      "https://dmdcosts.onrender.com/addclient",
      client_data
    );
  };

  saveEditedClient = async (client_id, edited_client_data) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/updateclient${client_id}`,
      edited_client_data
    );
  };

  deleteClient = async (client_id) => {
    return await axios.post(
      `https://dmdcosts.onrender.com/deleteclient${client_id}`
    );
  };

  getClientDetails = async (client_id) => {
    return await axios.get(`https://dmdcosts.onrender.com/client${client_id}`);
  };

  produceSingleInvoices = async (cases_involved) => {
    const admin = JSON.parse(Cookies.get("employeeData"));
    return await axios.post(
      `https://dmdcosts.onrender.com/produce-single-invoices`,
      {
        cases_involved,
        admin_id: admin?.id,
      }
    );
  };

  produceBundleInvoices = async (client_id, cases_involved) => {
    const admin = JSON.parse(Cookies.get("employeeData"));
    return await axios.post(
      `https://dmdcosts.onrender.com/produce-bundle-invoices${client_id}`,
      { cases_involved, admin_id: admin?.id }
    );
  };
}

export default AppGateway;
