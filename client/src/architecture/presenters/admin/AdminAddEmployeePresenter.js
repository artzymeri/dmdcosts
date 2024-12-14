import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class AdminAddEmployeePresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    newEmployeeObject: {
      name_surname: null,
      username: null,
      email_address: null,
      password: null,
      role: null,
      bank_details: {
        account_holder: null,
        account_number: null,
        sort_code: null,
      },
    },
    snackbar_boolean: false,
    snackbar_details: null,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      handleChangeValues: action.bound,
      handleChangeBankDetails: action.bound,
      saveNewEmployee: action.bound,
      setSnackbar: action.bound,
      snackbarBoolean: computed,
      snackbarDetails: computed,
    });
  }

  handleChangeValues = (target, value) => {
    this.vm.newEmployeeObject[target] = value;
  };

  handleRoleChange = (event) => {
    this.vm.newEmployeeObject.role = event?.target?.value;
  };

  handleChangeBankDetails = (target, value) => {
    this.vm.newEmployeeObject.bank_details[target] = value;
  };

  saveNewEmployee = async () => {
    const response = await this.mainAppRepository.registerUser(
      this.vm.newEmployeeObject
    );
    if (response.data.title == "success") {
      this.vm.newEmployeeObject = {
        name_surname: null,
        username: null,
        email_address: null,
        password: null,
        role: null,
        bank_details: {
          account_holder: null,
          account_number: null,
          sort_code: null,
        },
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

  get snackbarBoolean() {
    return this.vm.snackbar_boolean;
  }

  get snackbarDetails() {
    return this.vm.snackbar_details;
  }
}

export default AdminAddEmployeePresenter;
