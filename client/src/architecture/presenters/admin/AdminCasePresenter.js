import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import Cookies from "js-cookie";
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
        id: 5,
        title: "Mark as Served",
        value: "served",
      },
      {
        id: 6,
        title: "Mark as Settled",
        value: "settled",
      },
      {
        id: 7,
        title: "Mark as Paid",
        value: "paid",
      },
    ],
    non_negotiable_status_options: [
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
        id: 5,
        title: "Mark as Sent to Client",
        value: "sent-to-client",
      },
      {
        id: 6,
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
    new_offer_formality: false,
    add_offer_modal_open: false,
    type_of_offer_modal: null,
    offer_to_edit_id: null,
    pod_due_date: null,
    extended_pod_due_date: null,
    checked_status_modal: null,
    checked_date: null,
    settled_status_modal: null,
    settled_date: null,
    editable_case_fields: null,
    edit_view: false,
    case_invoice_object: null,
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
      POD: computed,
      showStatusDropdown: computed,
      alreadyHasInvoice: computed,
      clientDetails: computed,
    });
  }

  getCaseDetailsAsAdmin = async (case_id) => {
    const response = await this.mainAppRepository.getCaseDetailsAsAdmin(
      case_id
    );
    const clients_response = await this.mainAppRepository.getAllClients();
    const employees_response = await this.mainAppRepository.getAllEmployees();
    const invoice_object_response = await this.mainAppRepository.getCaseInvoice(
      case_id
    );
    this.vm.case_invoice_object = invoice_object_response.data.invoice;
    this.vm.case_details = response.data;
    this.vm.editable_case_fields = response?.data?.case;
    this.vm.clients_list = clients_response.data;
    this.vm.employees_list = employees_response.data;
  };

  setCheckedCaseStatusModal(boolean) {
    if (boolean == false) {
      this.vm.checked_date = null;
      this.vm.checked_status_modal = boolean;
    } else {
      this.vm.checked_status_modal = boolean;
    }
  }

  setSettledCaseStatusModal(boolean) {
    if (boolean == false) {
      this.vm.settled_date = null;
      this.vm.settled_status_modal = boolean;
    } else {
      this.vm.settled_status_modal = boolean;
    }
  }

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

  handleCheckedCaseDate = (value) => {
    if (value) {
      this.vm.checked_date = value;
    } else {
      console.warn("Something is wrong with the date!");
    }
  };

  handleSettledCaseDate = (value) => {
    if (value) {
      this.vm.settled_date = value;
    } else {
      console.warn("Something is wrong with the date!");
    }
  };

  handleNewOfferValueChange = (event) => {
    this.vm.new_offer_value = event.target.value;
  };

  handlePodDueDate = (value) => {
    if (value) {
      this.vm.pod_due_date = value;
    } else {
      console.warn("Something is wrong with the date!");
    }
  };

  handleExtendedPodDueDate = async (value) => {
    if (value) {
      this.vm.extended_pod_due_date = value;
      const response = await this.mainAppRepository.extendCasePodDueDate(
        this.vm.case_details?.case?.id,
        this.vm.extended_pod_due_date
      );
      this.vm.refresh_state += 1;
      return response;
    } else {
      console.warn("Something is wrong with the date!");
    }
  };

  changeNewOfferFormality = (event) => {
    this.vm.new_offer_formality = event.target.checked;
  };

  handleCaseStatusChange = async (event) => {
    if (event.target.value == "checked") {
      this.vm.checked_status_modal = true;
      return;
    }
    const response = await this.mainAppRepository.changeCaseStatus(
      this.vm.case_details?.case?.id,
      event.target.value
    );
    this.vm.refresh_state += 1;
    return response;
  };

  confirmSettleCase = async () => {
    const response = await this.mainAppRepository.changeCaseStatus(
      this.vm.case_details?.case?.id,
      "settled",
      this.vm.settled_date
    );
    this.vm.settled_status_modal = false;
    this.vm.settled_date = null;
    this.vm.refresh_state += 1;
    return response;
  };

  confirmCheckCase = async () => {
    const response = await this.mainAppRepository.changeCaseStatus(
      this.vm.case_details?.case?.id,
      "checked",
      this.vm.checked_date
    );
    this.vm.checked_status_modal = false;
    this.vm.checked_date = null;
    this.vm.refresh_state += 1;
    return response;
  };

  changeCaseStatus = async (case_id, status) => {
    if (status == "settled") {
      this.vm.settled_status_modal = true;
      return;
    }
    const response = await this.mainAppRepository.changeCaseStatus(
      case_id,
      status
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
        this.vm.new_offer_formality,
        this.vm.pod_due_date,
        this.vm.type_of_offer_modal,
        this.vm.offer_to_edit_id,
        this.firstOffer
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
    const response = await this.mainAppRepository.changeCasePODStatus(
      this.caseDetails?.id,
      !this.POD
    );
    this.setSnackbar(true, response.data);
    this.vm.refresh_state += 1;
    return response;
  };

  switchEditView = () => {
    if (!this.vm.edit_view == false) {
      this.vm.editable_case_fields = this.vm.case_details.case;
    }
    this.vm.edit_view = !this.vm.edit_view;
  };

  handleClientEditChange = (event) => {
    this.vm.editable_case_fields.client_id = event.target.value;
  };

  handleEmployeeEditChange = (event) => {
    this.vm.editable_case_fields.assignee_id = event.target.value;
  };

  handleDateInstructedChange = (value) => {
    this.vm.editable_case_fields.date_instructed = value;
  };

  handleDateCheckedChange = (value) => {
    this.vm.editable_case_fields.checked_date = value;
  };

  handleDateSettledChange = (value) => {
    this.vm.editable_case_fields.settled_date = value;
  };

  handleTypeEditChange = (event) => {
    this.vm.editable_case_fields.type = event.target.value;
  };

  handleNegotiableChange = (event) => {
    this.vm.editable_case_fields.negotiable = event.target.checked;
  };

  changeEditTextDetails = (value, target) => {
    this.vm.editable_case_fields[target] = value;
  };

  saveEditValues = async () => {
    const response = await this.mainAppRepository.editCase(
      this.vm.editable_case_fields
    );
    this.setSnackbar(true, response.data);
    this.vm.edit_view = false;
    this.vm.refresh_state += 1;
  };

  insertInvoiceToDatabase = async () => {
    const adminData = JSON.parse(Cookies.get("employeeData"));
    const response = await this.mainAppRepository.insertInvoiceToDatabase(
      [this.caseDetails?.id],
      adminData?.id,
      this.caseDetails?.client_id
    );
    this.setSnackbar(true, response.data);
    this.vm.refresh_state += 1;
  };

  get assignedEmployee() {
    return this.vm.employees_list.find(
      (employee) => employee.id == this.vm?.case_details?.case?.assignee_id
    );
  }

  get caseClient() {
    return this.vm.clients_list.find(
      (client) => client.id == this.vm?.case_details?.case?.client_id
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

  get checkedStatusModal() {
    return this.vm.checked_status_modal;
  }

  get settledStatusModal() {
    return this.vm.settled_status_modal;
  }

  get caseOffers() {
    if (this.vm.case_details?.case?.offers) {
      return JSON.parse(this.vm.case_details.case.offers);
    } else {
      return [];
    }
  }

  get firstOffer() {
    return this.caseOffers.length == 0;
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

  get showStatusDropdown() {
    if (this.caseDetails.negotiable) {
      return (
        this.vm.case_details?.case?.status == "to-draft" ||
        this.vm.case_details?.case?.status == "drafted" ||
        this.vm.case_details?.case?.status == "to-amend"
      );
    } else {
      return true;
    }
  }

  get alreadyHasInvoice() {
    return this.vm.case_invoice_object;
  }

  get clientDetails() {
    return this.vm.clients_list.find(
      (client) => client.id == this.caseDetails.client_id
    );
  }
}

export default AdminCasePresenter;
