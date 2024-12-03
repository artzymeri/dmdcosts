import { inject, injectable } from "inversify";
import { TYPES } from "@/architecture/ioc/types";
import "reflect-metadata";
import { action, computed, makeObservable, observable } from "mobx";

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

  deleteCase = async (case_id) => {
    return await this.appGateway.deleteCase(case_id);
  };

  getAllCases = async () => {
    return await this.appGateway.getAllCases();
  };

  getCaseDetails = async (employee_id, case_id) => {
    return await this.appGateway.getCaseDetails(employee_id, case_id);
  };

  getCaseDetailsAsAdmin = async (case_id) => {
    return await this.appGateway.getCaseDetailsAsAdmin(case_id);
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
}

export default MainAppRepository;
