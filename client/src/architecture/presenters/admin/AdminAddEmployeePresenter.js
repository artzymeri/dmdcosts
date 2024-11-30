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
        bank_name: null,
      },
    },
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      handleChangeValues: action.bound,
      handleChangeBankDetails: action.bound,
      saveNewEmployee: action.bound,
    });
  }

  handleChangeValues = (target, value) => {
    this.vm.newEmployeeObject[target] = value;
  };

  handleRoleChange = (value) => {
    this.vm.newEmployeeObject.role = value;
  };

  handleChangeBankDetails = (target, value) => {
    this.vm.newEmployeeObject.bank_details[target] = value;
  };

  saveNewEmployee = async () => {
    const response = await this.mainAppRepository.addEmployee(
      this.vm.newEmployeeObject
    );
    this.vm.newEmployeeObject = {
      name_surname: null,
      username: null,
      email_address: null,
      password: null,
      role: null,
      bank_details: {
        account_holder: null,
        account_number: null,
        bank_name: null,
      },
    };
  };
}

export default AdminAddEmployeePresenter;
