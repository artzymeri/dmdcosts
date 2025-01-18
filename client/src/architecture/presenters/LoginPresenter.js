import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import Cookies from "js-cookie";

@injectable()
class LoginRegisterPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    loginUserDataObject: {
      username: null,
      password: null,
    },
    loading: false,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      login: action.bound,
      loginUserData: computed,
      loading: computed,
    });
  }

  login = async () => {
    this.vm.loading = true;
    const response = await this.mainAppRepository.login(this.loginUserData);
    const {
      id,
      name_surname,
      username,
      email_address,
      role,
      bank_details,
      adminToken,
      employeeToken,
    } = response.data;
    if (role === "admin") {
      const parsedBankDetails = JSON.parse(bank_details);
      Cookies.set("adminToken", adminToken, { expires: 365 });
      Cookies.set(
        "employeeData",
        JSON.stringify({
          id: id,
          name_surname: name_surname,
          username: username,
          email_address: email_address,
          account_holder: parsedBankDetails?.account_holder,
          account_number: parsedBankDetails?.account_number,
          sort_code: parsedBankDetails?.sort_code,
          role: role,
        }),
        { expires: 3 / 24 }
      );
    } else if (role === "employee") {
      Cookies.set("employeeToken", employeeToken, { expires: 365 });
      Cookies.set(
        "employeeData",
        JSON.stringify({
          id: id,
          name_surname: name_surname,
          username: username,
          email_address: email_address,
          role: role,
        }),
        { expires: 3 / 24 }
      );
    }
    this.vm.loading = false;
  };

  changeLoginUserData = (type, value) => {
    this.vm.loginUserDataObject[type] = value;
  };

  get loginUserData() {
    return this.vm.loginUserDataObject;
  }

  get loading() {
    return this.vm.loading;
  }
}

export default LoginRegisterPresenter;
