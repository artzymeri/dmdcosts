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
            notificationsMenuList: computed,
            lastOfferReminders: computed
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

    get lastOfferReminders() {
        const todayDate = new Date();
        const daysThreshold = 3;
    
        return this.vm.cases_list
            .filter((case_details) => {
                const parsedOffersArray = JSON.parse(case_details.offers) || [];
                if (case_details.negotiable && parsedOffersArray.length > 0 && !parsedOffersArray[parsedOffersArray.length - 1]?.received?.value) {
                    const lastOffer = parsedOffersArray[parsedOffersArray.length - 1];
                    const sentDate = new Date(lastOffer.sent.date);
                    const diffInTime = todayDate - sentDate;
                    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    
                    return diffInDays >= daysThreshold;
                }
            })
            .map((case_details) => {
                const linkedClient = this.vm.clients_list.find((client) => client.id == case_details.client_id);
                return ({
                    ...case_details,
                    client_initials: linkedClient?.initials,
                    alert: 'last-offer-reminder'
                });
            });
    }
    
    
    get podCaseReminders() {
        const todayDate = new Date();
        
        return this.vm.cases_list
            .filter((case_details) => {
                const parsedOffersArray = JSON.parse(case_details.offers) || [];
                if (case_details.negotiable && !case_details.pod_checked && parsedOffersArray.length > 0 && parsedOffersArray[0]?.sent?.formality) {
                    const sentDate = new Date(parsedOffersArray[0].sent.date);
                    const diffInTime = todayDate - sentDate;
                    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); // Round down to the nearest day
    
                    return diffInDays >= 14;
                }
            })
            .map((case_details) => {
                const linkedClient = this.vm.clients_list.find((client) => client.id == case_details.client_id);
                const parsedOffersArray = JSON.parse(case_details.offers) || [];
                const sentDate = new Date(parsedOffersArray[0].sent.date);
                const diffInTime = todayDate - sentDate;
                const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); // Round down to the nearest day
    
                let alertType;
                if (diffInDays === 21) {
                    alertType = 'pod-deadline'; // If it's exactly 21 days
                } else if (diffInDays > 21) {
                    alertType = 'pod-expired'; // If it's more than 21 days
                } else {
                    alertType = 'pod-expiring'; // If it's more than or equal to 14 but less than 21
                }
    
                return ({
                    ...case_details,
                    client_initials: linkedClient?.initials,
                    alert: alertType
                });
            });
    }
    

    get notificationsNumber() {
        return this.podCaseReminders.length + this.lastOfferReminders.length;
    }

    get notificationsMenuList() {
        return [...this.podCaseReminders, ...this.lastOfferReminders]
    }

}

export default AdminHeaderPresenter;