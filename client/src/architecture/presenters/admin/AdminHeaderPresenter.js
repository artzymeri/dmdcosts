import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class AdminHeaderPresenter {

    vm = {
        userData: null
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            userData: computed
        });
    }

    async getUserData() {
       this.vm.userData = await JSON.parse(Cookies.get("userData"));
    }

    get userData() {
        return this.vm.userData
    }

}

export default AdminHeaderPresenter;