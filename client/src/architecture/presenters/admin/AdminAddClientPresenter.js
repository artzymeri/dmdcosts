import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class AdminAddClientPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    newClientObject: {
      business_name: null,
      address: null,
      email_address: null,
      rates_config: {
        per_hour_price: null,
      },
    },
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      handleChangeValues: action.bound,
      handleChangeRatesConfig: action.bound,
      saveNewClient: action.bound,
    });
  }

  handleChangeValues = (target, value) => {
    this.vm.newClientObject[target] = value;
  };

  handleChangeRatesConfig = (target, value) => {
    this.vm.newClientObject.rates_config[target] = parseInt(value);
  };

  saveNewClient = async () => {
    const response = await this.mainAppRepository.addClient(
      this.vm.newClientObject
    );
    this.vm.newClientObject = {
      business_name: null,
      address: null,
      email_address: null,
      rates_config: {
        per_hour_price: null,
      },
    };
  };
}

export default AdminAddClientPresenter;
