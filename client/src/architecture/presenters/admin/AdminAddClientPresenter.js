import {TYPES} from "@/architecture/ioc/types";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";

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
        snackbar_boolean: false,
        snackbar_details: null,
    };

    constructor() {
        makeObservable(this, {
            vm: observable,
            handleChangeValues: action.bound,
            handleChangeRatesConfig: action.bound,
            saveNewClient: action.bound,
            setSnackbar: action.bound,
            snackbarBoolean: computed,
            snackbarDetails: computed,
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
        if (response.data.title == "success") {
            this.vm.newClientObject = {
                business_name: null,
                address: null,
                email_address: null,
                rates_config: {
                    per_hour_price: null,
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

export default AdminAddClientPresenter;
