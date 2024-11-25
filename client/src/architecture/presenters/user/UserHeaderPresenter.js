import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class UserHeaderPresenter {

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
        const userData = Cookies.get("userData");

        if (userData) {
            try {
                this.vm.userData = JSON.parse(userData);
            } catch (error) {
                console.error("Failed to parse userData:", error);
                this.vm.userData = null;
            }
        } else {
            console.warn("No userData found in cookies.");
            this.vm.userData = null;
        }
    }


    get userData() {
        return this.vm.userData
    }

}

export default UserHeaderPresenter;