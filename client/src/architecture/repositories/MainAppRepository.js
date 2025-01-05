import { inject, injectable } from "inversify";
import { TYPES } from "@/architecture/ioc/types";
import "reflect-metadata";
import { action, makeObservable } from "mobx";

@injectable()
class MainAppRepository {
  @inject(TYPES.AppGateway) appGateway;

  constructor() {
    makeObservable(this, {
      registerUser: action.bound,
      login: action.bound,
      getAllEmployees: action.bound,
      deleteEmployee: action.bound,
      createCase: action.bound,
      deleteCase: action.bound,
      getAllCases: action.bound,
      getCaseDetails: action.bound,
      getCaseDetailsAsAdmin: action.bound,
      getAllClients: action.bound,
      addClient: action.bound,
      saveEditedClient: action.bound,
      deleteClient: action.bound,
      getClientDetails: action.bound,
    });
  }

  //functions

  registerUser = async (user_data) => {
    return await this.appGateway.registerUser(user_data);
  };

  login = async (user_data) => {
    return await this.appGateway.login(user_data);
  };

  getAllEmployees = async () => {
    return await this.appGateway.getAllEmployees();
  };

  deleteEmployee = async (employee_id) => {
    return await this.appGateway.deleteEmployee(employee_id);
  };

  createCase = async (case_object) => {
    return await this.appGateway.createCase(case_object);
  };

  editCase = async (case_object) => {
    return await this.appGateway.editCase(case_object);
  };

  deleteCase = async (case_id) => {
    return await this.appGateway.deleteCase(case_id);
  };

  deleteInvoice = async (invoice_id) => {
    return await this.appGateway.deleteInvoice(invoice_id);
  };

  changeCaseStatus = async (case_id, status, date) => {
    return await this.appGateway.changeCaseStatus(case_id, status, date);
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
    return await this.appGateway.addNewCaseOffer(
      case_id,
      new_offer_date,
      new_offer_value,
      formality,
      pod_due_date,
      type,
      offer_id,
      first_offer
    );
  };

  deleteCaseOffer = async (case_id, offer_id) => {
    return await this.appGateway.deleteCaseOffer(case_id, offer_id);
  };

  changeCasePODStatus = async (case_id, boolean) => {
    return await this.appGateway.changeCasePODStatus(case_id, boolean);
  };

  extendCasePodDueDate = async (case_id, date) => {
    return await this.appGateway.extendCasePodDueDate(case_id, date);
  };

  getAllCases = async () => {
    return await this.appGateway.getAllCases();
  };

  getCaseDetails = async (employee_id, case_id) => {
    return await this.appGateway.getCaseDetails(employee_id, case_id);
  };

  getCaseInvoice = async (case_id) => {
    return await this.appGateway.getCaseInvoice(case_id);
  };

  getCaseDetailsAsAdmin = async (case_id) => {
    return await this.appGateway.getCaseDetailsAsAdmin(case_id);
  };

  insertInvoiceToDatabase = async (cases_array, admin_id, client_id) => {
    return await this.appGateway.insertInvoiceToDatabase(
      cases_array,
      admin_id,
      client_id
    );
  };

  getAllInvoices = async () => {
    return await this.appGateway.getAllInvoices();
  };

  getAllClients = async () => {
    return await this.appGateway.getAllClients();
  };

  addClient = async (client_data) => {
    return await this.appGateway.addClient(client_data);
  };

  saveEditedClient = async (client_id, edited_client_data) => {
    return await this.appGateway.saveEditedClient(
      client_id,
      edited_client_data
    );
  };

  deleteClient = async (client_id) => {
    return await this.appGateway.deleteClient(client_id);
  };

  getClientDetails = async (client_id) => {
    return await this.appGateway.getClientDetails(client_id);
  };

  produceSingleInvoices = async (cases_involved) => {
    return await this.appGateway.produceSingleInvoices(cases_involved);
  };

  produceBundleInvoices = async (client_id, cases_involved) => {
    return await this.appGateway.produceBundleInvoices(
      client_id,
      cases_involved
    );
  };
}

export default MainAppRepository;
