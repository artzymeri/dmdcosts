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
    status_options: [
      {
        id: 1,
        title: "To Draft",
        value: "to-draft",
      },
      {
        id: 2,
        title: "Mark as To Amend",
        value: "to-amend",
      },
      {
        id: 3,
        title: "Mark as Drafted",
        value: "drafted",
      },
      {
        id: 4,
        title: "Mark as Checked",
        value: "checked",
      },
      {
        id: 3,
        title: "Mark as Served",
        value: "served",
      },
      {
        id: 3,
        title: "Mark as Settled",
        value: "settled",
      },
      {
        id: 3,
        title: "Mark as Paid",
        value: "done",
      },
    ],
    pod_options: [
      {
        id: 1,
        title: "POD Checked",
        value: true,
      },
      {
        id: 2,
        title: "POD Unchecked",
        value: false,
      },
    ],
    snackbar_boolean: false,
    snackbar_details: null,
    deletion_confirmation_modal: false,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      getCaseDetailsAsAdmin: action.bound,
      deleteCase: action.bound,
      setDeletionConfirmationModal: action.bound,
      caseDetails: computed,
      assignedEmployee: computed,
      caseClient: computed,
      setSnackbar: action.bound,
      snackbarBoolean: computed,
      snackbarDetails: computed,
      deletionConfirmationModal: computed,
      servingButtonDisabled: computed,
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

  deleteCase = async () => {
    const response = await this.mainAppRepository.deleteCase(
      this.vm.case_details?.case?.id
    );
    this.vm.refresh_state += 1;
    return response;
  };

  handleLastOfferDateChange = (value) => {
    if (value) {
      this.vm.case_details.case.last_offer_date = value.toDate();
    } else {
      console.warn("Something is wrong with the date!");
    }
  };

  handleCaseStatusChange = async (event) => {
    const response = await this.mainAppRepository.changeCaseStatus(
      this.vm.case_details?.case?.id,
      event.target.value
    );
    this.vm.refresh_state += 1;
    return response;
  };

  handleCasePaymentChange = async (boolean) => {
    const response = await this.mainAppRepository.changeCasePayment(
      this.vm.case_details?.case?.id,
      boolean
    );
    this.vm.refresh_state += 1;
    return response;
  };

  handleCaseServingChange = async () => {
    const response = await this.mainAppRepository.changeCaseServing(
      this.vm.case_details?.case?.id,
      this.vm.case_details?.case?.served
        ? null
        : this.vm.case_details?.case?.last_offer_date
    );
    this.vm.refresh_state += 1;
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

  setDeletionConfirmationModal(boolean) {
    this.vm.deletion_confirmation_modal = boolean;
  }

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

  get snackbarBoolean() {
    return this.vm.snackbar_boolean;
  }

  get snackbarDetails() {
    return this.vm.snackbar_details;
  }

  get deletionConfirmationModal() {
    return this.vm.deletion_confirmation_modal;
  }

  get servingButtonDisabled() {
    return !this.vm.case_details?.case?.last_offer_date;
  }
}

export default AdminCasePresenter;
