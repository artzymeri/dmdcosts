import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class EmployeeHeaderPresenter {

    vm = {
        employeeData: null
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            employeeData: computed
        });
    }

    async getEmployeeData() {
        const userData = Cookies.get("employeeData");

        if (employeeData) {
            try {
                this.vm.employeeData = JSON.parse(employeeData);
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
        return this.vm.employeeData
    }

}

export default EmployeeHeaderPresenter;