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
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      login: action.bound,
      loginUserData: computed,
    });
  }

  login = async () => {
    const response = await this.mainAppRepository.login(this.loginUserData);
    const {
      id,
      name_surname,
      username,
      email_address,
      role,
      adminToken,
      employeeToken,
    } = response.data;
    if (role === "admin") {
      Cookies.set("adminToken", adminToken, { expires: 3 / 24 });
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
    } else if (role === "employee") {
      Cookies.set("employeeToken", employeeToken, { expires: 3 / 24 });
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
  };

  changeLoginUserData = (type, value) => {
    this.vm.loginUserDataObject[type] = value;
  };

  get loginUserData() {
    return this.vm.loginUserDataObject;
  }
}

export default LoginRegisterPresenter;
