import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class AdminClientViewPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    client_details: null,
    edit_form: false,
    editable_client_details: null,
    cases_list: [],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      clientDetails: computed,
      editableClientDetails: computed,
      editForm: computed,
      client_cases: computed,
      getClientDetails: action.bound,
      switchEditForm: action.bound,
      saveEditedClientDetails: action.bound,
      changeEditableClientDetails: action.bound,
      changeEditableClientDetailsRatesConfig: action.bound,
    });
  }

  getClientDetails = async (id) => {
    const response = await this.mainAppRepository.getClientDetails(id);
    const cases_response = await this.mainAppRepository.getAllCases();
    this.vm.client_details = response?.data?.client;
    this.vm.editable_client_details = response?.data?.client;
    this.vm.cases_list = cases_response.data;
  };

  switchEditForm(value) {
    this.vm.edit_form = value;
  }

  saveEditedClientDetails = async () => {
    await this.mainAppRepository.saveEditedClient(
      this.clientDetails?.id,
      this.vm.editable_client_details
    );
    await this.getClientDetails(this.clientDetails?.id);
    this.switchEditForm(false);
  };

  changeEditableClientDetails = (target, value) => {
    this.vm.editable_client_details[target] = value;
  };

  changeEditableClientDetailsRatesConfig = (target, value) => {
    this.vm.editable_client_details.rates_config[target] = value;
  };

  get clientDetails() {
    return this.vm.client_details;
  }

  get editableClientDetails() {
    return this.vm.editable_client_details;
  }

  get editForm() {
    return this.vm.edit_form;
  }

  get client_cases() {
    return this.vm.cases_list.map((case_details) => {
      if (case_details.client_id == this.clientDetails.id) {
        return case_details;
      }
    })
  }
}

export default AdminClientViewPresenter;
