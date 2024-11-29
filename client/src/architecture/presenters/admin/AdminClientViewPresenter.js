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
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      clientDetails: computed,
      editableClientDetails: computed,
      editForm: computed,
      getClientDetails: action.bound,
      switchEditForm: action.bound,
      saveEditedClientDetails: action.bound,
      changeEditableClientDetails: action.bound,
      changeEditableClientDetailsRatesConfig: action.bound,
    });
  }

  getClientDetails = async (id) => {
    const response = await this.mainAppRepository.getClientDetails(id);
    this.vm.client_details = response?.data?.client;
    this.vm.editable_client_details = response?.data?.client;
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
}

export default AdminClientViewPresenter;
