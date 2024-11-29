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
      // other values
    },
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
    });
  }

  saveNewClient = async () => {
    // function to save new Client
  };
}

export default AdminAddClientPresenter;
