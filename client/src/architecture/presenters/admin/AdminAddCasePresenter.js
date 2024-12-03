import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import dayjs from "dayjs";

@injectable()
class AdminAddCasePresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    newCaseObject: {
      client_id: null,
      assignee_id: null,
      reference_number: null,
      status: "to-do",
      paid: false,
      served: false,
      last_offer_date: null,
    },
    clients_list: [],
    employees_list: [],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      handleChangeValues: action.bound,
      handleClientChange: action.bound,
      handleDateChange: action.bound,
      getClientsEmployeesList: action.bound,
      saveNewCase: action.bound,
      clientsList: computed,
    });
  }

  getClientsEmployeesList = async () => {
    const response_clients = await this.mainAppRepository.getAllClients();
    const response_employees = await this.mainAppRepository.getAllEmployees();
    this.vm.clients_list = response_clients.data;
    this.vm.employees_list = response_employees.data;
  };

  handleChangeValues = (target, value) => {
    this.vm.newCaseObject[target] = value;
  };

  handleClientChange = (event) => {
    this.vm.newCaseObject.client_id = event?.target?.value;
  };

  handleAssigneeChange = (event) => {
    this.vm.newCaseObject.assignee_id = event?.target?.value;
  };

  handleDateChange = (value) => {
    this.vm.newCaseObject.last_offer_date = value;
  };

  saveNewCase = async () => {
    let newCase = {
      ...this.vm.newCaseObject,
      last_offer_date: this.vm.newCaseObject.last_offer_date.toDate(),
    };
    const response = await this.mainAppRepository.createCase(newCase);
    this.vm.newCaseObject = {
      client_id: null,
      assignee_id: null,
      reference_number: null,
      status: null,
      paid: false,
      served: false,
      last_offer_date: null,
    };
  };

  get clientsList() {
    return this.vm.clients_list;
  }

  get employeesList() {
    return this.vm.employees_list;
  }
}

export default AdminAddCasePresenter;
