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
      claimant_name: null,
      client_reference_number: null,
      defendant_name: null,
      defendant_reference_number: null,
      defendant_email: null,
      rate_per_hour: null,
      status: "to-draft",
      type: null,
      negotiable: false,
      date_instructed: null,
    },
    clients_list: [],
    employees_list: [],
    snackbar_boolean: false,
    snackbar_details: null,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      handleChangeValues: action.bound,
      handleClientChange: action.bound,
      handleDateChange: action.bound,
      getClientsEmployeesList: action.bound,
      handleNegotiableChange: action.bound,
      saveNewCase: action.bound,
      clientsList: computed,
      setSnackbar: action.bound,
      snackbarBoolean: computed,
      snackbarDetails: computed,
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

  handleCaseTypeChange = (event) => {
    this.vm.newCaseObject.type = event?.target?.value;
  };

  handleDateChange = (value) => {
    this.vm.newCaseObject.date_instructed = value;
  };

  handleNegotiableChange = (event) => {
    this.vm.newCaseObject.negotiable = event.target.checked
  }

  saveNewCase = async () => {
    let newCase = {
      ...this.vm.newCaseObject,
      date_instructed: this.vm?.newCaseObject?.date_instructed
        ? this.vm.newCaseObject.date_instructed.toDate()
        : null,
    };
    const response = await this.mainAppRepository.createCase(newCase);
    if (response.data.title == "success") {
      this.vm.newCaseObject = {
        client_id: null,
        assignee_id: null,
        claimant_name: null,
        client_reference_number: null,
        defendant_name: null,
        defendant_reference_number: null,
        defendant_email: null,
        rate_per_hour: null,
        status: "to-draft",
        type: null,
        negotiable: false,
        date_instructed: null,
      };
    }
    return response;
  };

  setSnackbar(value, details) {
    this.vm.snackbar_boolean = value;
    this.vm.snackbar_details = details;
    setTimeout(() => {
      this.vm.snackbar_boolean = false;
      this.vm.snackbar_details = null;
    }, 3000);
  }

  get clientsList() {
    return this.vm.clients_list;
  }

  get employeesList() {
    return this.vm.employees_list;
  }

  get snackbarBoolean() {
    return this.vm.snackbar_boolean;
  }

  get snackbarDetails() {
    return this.vm.snackbar_details;
  }
}

export default AdminAddCasePresenter;
