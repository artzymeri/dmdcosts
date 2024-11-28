import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class EmployeeAddCasePresenter {

    @inject(TYPES.MainAppRepository) MainAppRepository;

    vm = {
        newCaseObject: {
            sender_id: null,
            sender_name_surname: null,
            sender_business_name: null,
            sender_email_address: null,
            sender_phone_number: null,
            receiver_name_surname: null,
            receiver_phone_number: null,
            receiver_phone_number_2: null,
            receiver_city: null,
            receiver_state: null,
            receiver_full_address: null,
            product_price: null,
            product_description: null,
            comment: null,
        }
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            changeValues: action.bound
        });
    }

    changeValues(e, target){
        this.vm.newCaseObject[target] = e.target.value;
    }

    createOrder = async () => {
        const { id, name_surname, business_name, email_address, phone_number } = JSON.parse(Cookies.get("employeeData"));

        Object.assign(this.vm.newCaseObject, {
            sender_id: id,
            sender_name_surname: name_surname,
            sender_business_name: business_name,
            sender_email_address: email_address,
            sender_phone_number: phone_number
        });

        await this.MainAppRepository.createCase(this.vm.newCaseObject);
    }


}

export default EmployeeAddCasePresenter;