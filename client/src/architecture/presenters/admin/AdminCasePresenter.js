import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class AdminCasePresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    case_details: null,
    clients_list: [],
    employees_list: [],
    refresh_state: 1,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      getCaseDetailsAsAdmin: action.bound,
      cancelOrder: action.bound,
      caseDetails: computed,
      assignedEmployee: computed,
      caseClient: computed,
    });
  }

  getCaseDetailsAsAdmin = async (case_id) => {
    const response = await this.mainAppRepository.getCaseDetailsAsAdmin(
      case_id
    );
    const clients_response = await this.mainAppRepository.getAllClients();
    const employees_response = await this.mainAppRepository.getAllEmployees();
    this.vm.case_details = response.data;
    this.vm.clients_list = clients_response.data;
    this.vm.employees_list = employees_response.data;
  };

  cancelOrder = async (case_id) => {
    const response = await this.mainAppRepository.cancelCase(case_id);
    this.vm.refresh_state += 1;
    return response;
  };

  get assignedEmployee() {
    return this.vm.employees_list.find(
      (employee) => employee.id == this.vm.case_details.case.assignee_id
    );
  }

  get caseClient() {
    return this.vm.clients_list.find(
      (client) => client.id == this.vm.case_details.case.client_id
    );
  }

  get caseDetails() {
    return this.vm.case_details?.case;
  }
}

export default AdminCasePresenter;
