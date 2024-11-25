import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class LoginRegisterPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository

    vm = {
        loginUserDataObject: {
            email_address: null,
            phone_number: null,
            password: null,
        },
        newUserDataObject: {
            name_surname: null,
            business_name: null,
            location: null,
            phone_number: null,
            email_address: null,
            password: null
        },
        login_mode: 'email'
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            registerUser: action.bound,
            changeNewUserData: action.bound,
            changeLoginMode: action.bound,
            login: action.bound,
            newUserData: computed,
            loginUserData: computed,
            loginMode: computed
        });
    }

    registerUser = async () => {
        await this.mainAppRepository.registerUser(this.newUserData);
    }

    login = async () => {
        if (this.loginMode === 'email') {
            const response = await this.mainAppRepository.loginByEmail(this.loginUserData)
            const {
                id, name_surname, business_name, location, phone_number, email_address, role, adminToken, userToken
            } = response.data;
            if (role === 'admin') {
                await Cookies.set("adminToken", adminToken, {expires: 3 / 24});
                await Cookies.set('userData', JSON.stringify({
                    id: id,
                    name_surname: name_surname,
                    business_name: business_name,
                    location: location,
                    phone_number: phone_number,
                    email_address: email_address
                }), {expires: 3 / 24})
            } else if (role === 'user') {
                await Cookies.set("userToken", userToken, {expires: 3 / 24});
                await Cookies.set('userData', JSON.stringify({
                    id: id,
                    name_surname: name_surname,
                    business_name: business_name,
                    location: location,
                    phone_number: phone_number,
                    email_address: email_address
                }), {expires: 3 / 24})
            }
        } else if (this.loginMode === 'phone_number') {
            const response = await this.mainAppRepository.loginByPhone(this.loginUserData)
            const {
                id, name_surname, business_name, location, phone_number, email_address, role, adminToken, userToken
            } = response.data;
            if (role === 'admin') {
                await Cookies.set("adminToken", adminToken, {expires: 3 / 24});
                await Cookies.set('userData', JSON.stringify({
                    id: id,
                    name_surname: name_surname,
                    business_name: business_name,
                    location: location,
                    phone_number: phone_number,
                    email_address: email_address
                }), {expires: 3 / 24})
            } else if (role === 'user') {
                await Cookies.set("userToken", userToken, {expires: 3 / 24});
                await Cookies.set('userData', JSON.stringify({
                    id: id,
                    name_surname: name_surname,
                    business_name: business_name,
                    location: location,
                    phone_number: phone_number,
                    email_address: email_address
                }), {expires: 3 / 24})
            }
        }
    }

    changeLoginUserData = (type, value) => {
        this.vm.loginUserDataObject[type] = value;
    }

    changeNewUserData = (type, value) => {
        this.vm.newUserDataObject[type] = value;
    };

    changeLoginMode = (mode) => {
        this.vm.login_mode = mode;
    }

    get newUserData() {
        return this.vm.newUserDataObject;
    }

    get loginUserData() {
        return this.vm.loginUserDataObject;
    }

    get loginMode() {
        return this.vm.login_mode;
    }

}

export default LoginRegisterPresenter;