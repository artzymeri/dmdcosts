import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import Cookies from "js-cookie";
import { TYPES } from "@/architecture/ioc/types";

@injectable()
class AdminHeaderPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    clients_list: [],
    cases_list: [],
    employeeData: null,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      employeeData: computed,
      podCaseReminders: computed,
      notificationsNumber: computed,
      notificationsMenuList: computed,
      lastOfferReminders: computed,
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
    return this.vm.employeeData;
  }

  get lastOfferReminders() {
    const todayDate = new Date();
    const daysThreshold = 7;

    return this.vm.cases_list
      .filter((case_details) => {
        const parsedOffersArray = JSON.parse(case_details.offers) || [];
        if (
          case_details.negotiable &&
          parsedOffersArray.length > 0 &&
          !parsedOffersArray[parsedOffersArray.length - 1]?.received?.value
        ) {
          const lastOffer = parsedOffersArray[parsedOffersArray.length - 1];
          const sentDate = new Date(lastOffer.sent.date);
          const diffInTime = todayDate - sentDate;
          const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

          return diffInDays >= daysThreshold;
        }
      })
      .map((case_details) => {
        const linkedClient = this.vm.clients_list.find(
          (client) => client.id == case_details.client_id
        );
        return {
          ...case_details,
          client_initials: linkedClient?.initials,
          alert: "last-offer-reminder",
        };
      });
  }

  get billNeedsToBeDraftedReminders() {
    const todayDate = new Date();
    const daysThreshold = 7;

    return this.vm.cases_list
      .filter((case_details) => {
        if (
          case_details.status == "to-draft" ||
          case_details.status == "to-amend"
        ) {
          const dateInstructed = new Date(case_details.date_instructed);
          const diffInTime = todayDate - dateInstructed;
          const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

          return diffInDays >= daysThreshold;
        }
      })
      .map((case_details) => {
        const linkedClient = this.vm.clients_list.find(
          (client) => client.id == case_details.client_id
        );
        return {
          ...case_details,
          client_initials: linkedClient?.initials,
          alert: "bill-needs-to-be-drafted",
        };
      });
  }

  get podCaseReminders() {
    const todayDate = new Date();

    return this.vm.cases_list
      .filter((case_details) => {
        const parsedOffersArray = JSON.parse(case_details.offers) || [];
        if (
          case_details.negotiable &&
          !case_details.pod_checked &&
          parsedOffersArray.length > 0 &&
          parsedOffersArray[0]?.sent?.formality
        ) {
          const podDueDate = new Date(case_details.pod_due_date);
          const diffInTime = podDueDate - todayDate; // Calculate time difference
          const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Round up

          return diffInDays <= 3; // Reminder if 3 days or less remain
        }
      })
      .map((case_details) => {
        const linkedClient = this.vm.clients_list.find(
          (client) => client.id == case_details.client_id
        );
        const podDueDate = new Date(case_details.pod_due_date);
        const diffInTime = podDueDate - todayDate;
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

        let alertType;
        if (diffInDays === 0) {
          alertType = "pod-deadline"; // If it's exactly today
        } else if (diffInDays < 0) {
          alertType = "pod-expired"; // If it was yesterday or earlier
        } else {
          alertType = "pod-expiring"; // If it's within 3 days
        }

        return {
          ...case_details,
          client_initials: linkedClient?.initials,
          alert: alertType,
        };
      });
  }

  get notificationsNumber() {
    return (
      this.podCaseReminders.length +
      this.lastOfferReminders.length +
      this.billNeedsToBeDraftedReminders.length
    );
  }

  get notificationsMenuList() {
    return [
      ...this.podCaseReminders,
      ...this.lastOfferReminders,
      ...this.billNeedsToBeDraftedReminders,
    ];
  }
}

export default AdminHeaderPresenter;
