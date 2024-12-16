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
        value: "paid",
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
    new_offer_value: null,
    new_offer_date: null,
    add_offer_modal_open: false,
    type_of_offer_modal: null,
    offer_to_edit_id: null,
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
      caseOffers: computed,
      eligbleToCreateOffer: computed,
      addOfferModalOpen: computed,
      POD: computed
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

  handleNewOfferDateChange = (value) => {
    if (value) {
      this.vm.new_offer_date = value;
    } else {
      console.warn("Something is wrong with the date!");
    }
  };

  handleNewOfferValueChange = (event) => {
    this.vm.new_offer_value = event.target.value;
  };

  handleCaseStatusChange = async (event) => {
    const response = await this.mainAppRepository.changeCaseStatus(
      this.vm.case_details?.case?.id,
      event.target.value
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

  setAddOfferModal(boolean, type, offer_id) {
    if (boolean == false) {
      this.vm.offer_to_edit_id = null;
      this.vm.type_of_offer_modal = null;
      this.vm.new_offer_date = null;
      this.vm.new_offer_value = null;
      this.vm.add_offer_modal_open = boolean;
    }
    this.vm.offer_to_edit_id = offer_id;
    this.vm.type_of_offer_modal = type;
    this.vm.add_offer_modal_open = boolean;
  }

  confirmNewOffer = async () => {
    if (this.vm.new_offer_date && this.vm.new_offer_value) {
      const response = await this.mainAppRepository.addNewCaseOffer(
        this.caseDetails?.id,
        this.vm.new_offer_date.toDate(),
        this.vm.new_offer_value,
        this.vm.type_of_offer_modal,
        this.vm.offer_to_edit_id
      );
      this.vm.refresh_state += 1;
      return response;
    } else {
      this.setSnackbar(true, {
        title: "error",
        message: "You must fill both values before confirming!",
      });
    }
  };

  deleteOffer = async (offer_id) => {
    const response = await this.mainAppRepository.deleteCaseOffer(
      this.caseDetails?.id,
      offer_id
    );
    this.setSnackbar(true, response.data);
    this.vm.refresh_state += 1;
    return response;
  };

  changePODStatus = async () => {
    const response = await this.mainAppRepository.changeCasePODStatus(this.caseDetails?.id, !this.POD)
    this.setSnackbar(true, response.data);
    this.vm.refresh_state += 1;
    return response;
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
    return {
      ...this.vm.case_details?.case,
      client_initials: this.caseClient?.initials,
    };
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

  get caseOffers() {
    if (this.vm.case_details.case.offers) {
      return JSON.parse(this.vm.case_details.case.offers);
    } else {
      return [];
    }
  }

  get eligbleToCreateOffer() {
    if (
      this.caseDetails?.status == "checked" ||
      this.caseDetails?.status == "served"
    ) {
      return true;
    }
    return false;
  }

  get addOfferModalOpen() {
    return this.vm.add_offer_modal_open;
  }

  get typeOfOfferModal() {
    return this.vm.type_of_offer_modal;
  }

  get POD() {
    return this.vm.case_details?.case?.pod_checked;
  }
}

export default AdminCasePresenter;
