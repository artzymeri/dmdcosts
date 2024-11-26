import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class AdminHeaderPresenter {

    vm = {
        employeeData: null
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            employeeData: computed
        });
    }

    async getUserData() {
       this.vm.employeeData = await JSON.parse(Cookies.get("employeeData"));
    }

    get employeeData() {
        return this.vm.employeeData
    }

}

export default AdminHeaderPresenter;