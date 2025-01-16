import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import Cookies from "js-cookie";
import { TYPES } from "@/architecture/ioc/types";

@injectable()
class EmployeeHeaderPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    employeeData: null,
    editUserData: null,
    snackbar_boolean: false,
    snackbar_details: null,
    settings_popup: false,
    change_password_popup: false,
    change_password_values: {
      first_value: null,
      second_value: null,
    },
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      employeeData: computed,
      setSnackbar: action.bound,
      snackbarBoolean: computed,
      snackbarDetails: computed,
      settingsPopup: computed,
      changePasswordPopup: computed,
    });
  }

  setSnackbar(value, details) {
    this.vm.snackbar_boolean = value;
    this.vm.snackbar_details = details;
    setTimeout(() => {
      this.vm.snackbar_boolean = false;
      this.vm.snackbar_details = null;
    }, 3000);
  }

  setSettingsPopup(boolean) {
    this.vm.settings_popup = boolean;
  }

  setChangePasswordPopup(boolean) {
    this.vm.change_password_popup = boolean;
  }

  handleUserDataValuesChange(target, value) {
    this.vm.editUserData[target] = value;
  }

  handleChangePasswordValues(target, value) {
    this.vm.change_password_values[target] = value;
  }

  async saveEditUserDetails() {
    return await this.mainAppRepository.saveEditUserDetails(
      this.vm.editUserData
    );
  }

  async saveChangeUserPassword() {
    if (
      !this.vm.change_password_values?.first_value ||
      !this.vm.change_password_values?.second_value
    ) {
      this.setSnackbar(true, {
        title: "error",
        message: "Please fill out both values",
      });
      return;
    }
    if (
      this.vm.change_password_values?.first_value !==
      this.vm.change_password_values?.second_value
    ) {
      this.setSnackbar(true, {
        title: "error",
        message: "First value is not the same as the second value",
      });
      return;
    }
    return await this.mainAppRepository.saveChangeUserPassword(
      this.vm.employeeData?.id,
      this.vm.change_password_values?.first_value
    );
  }

  async getEmployeeData() {
    const employeeData = Cookies.get("employeeData");

    if (employeeData) {
      try {
        this.vm.employeeData = JSON.parse(employeeData);
        this.vm.editUserData = JSON.parse(employeeData);
      } catch (error) {
        console.error("Failed to parse employeeData:", error);
        this.vm.employeeData = null;
      }
    } else {
      console.warn("No employeeData found in cookies.");
      this.vm.employeeData = null;
    }
  }

  get employeeData() {
    return this.vm.employeeData;
  }

  get snackbarBoolean() {
    return this.vm.snackbar_boolean;
  }

  get snackbarDetails() {
    return this.vm.snackbar_details;
  }

  get settingsPopup() {
    return this.vm.settings_popup;
  }

  get changePasswordPopup() {
    return this.vm.change_password_popup;
  }
}

export default EmployeeHeaderPresenter;
