import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";
import {TYPES} from "@/architecture/ioc/types";

@injectable()
class AdminHeaderPresenter {
    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        clients_list: [],
        cases_list: [],
        employeeData: null,
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            employeeData: computed,
            podCaseReminders: computed,
            notificationsNumber: computed,
            notificationsMenuList: computed
        });
    }

    async init() {
        await this.getUserData();
        await this.getCases();
        await this.getClientsData();

    }

    async getCases() {
        const response = await this.mainAppRepository.getAllCases();
        this.vm.cases_list = response.data;
    }

    async getClientsData() {
        const response = await this.mainAppRepository.getAllClients();
        this.vm.clients_list = response.data;
    }

    async getUserData() {
        this.vm.employeeData = await JSON.parse(Cookies.get("employeeData"));
    }

    get employeeData() {
        return this.vm.employeeData
    }

    get podCaseReminders() {
        const todayDate = new Date();
        return this.vm.cases_list
            .filter((case_details) => {
                const parsedOffersArray = JSON.parse(case_details.offers) || [];
                if (case_details.negotiable && !case_details.pod_checked && parsedOffersArray.length > 0) {
                    const sentDate = new Date(parsedOffersArray[0].sent.date);
                    const diffInTime = todayDate - sentDate;
                    const diffInDays = diffInTime / (1000 * 3600 * 24);
                    return diffInDays >= 14;
                }
            })
            .map((case_details) => {
                const linkedClient = this.vm.clients_list.find((client) => client.id == case_details.client_id)
                return ({
                    ...case_details,
                    client_initials: linkedClient?.initials,
                    alert: 'pod-expiring'
                })
            });
    }


    get notificationsNumber() {
        return this.podCaseReminders.length;
    }

    get notificationsMenuList() {
        return [...this.podCaseReminders]
    }

}

export default AdminHeaderPresenter;