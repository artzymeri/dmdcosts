import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import dayjs from "dayjs";

@injectable()
class AdminDashboardPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    loading: false,
    all_cases: [],
    clients_list: [],
    employees_list: [],
    origin_date: dayjs(),
    todays_date: dayjs(),
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allCases: computed,
      instructedTodayCases: computed,
      checkedTodayCases: computed,
      settledTodayCases: computed,
      podCaseReminders: computed,
      lastOfferReminders: computed,
      billNeedsToBeDraftedReminders: computed,
      billNeedsToBeServedReminders: computed,
      notificationsNumber: computed,
      notificationsMenuList: computed,
      init: action.bound,
    });
  }

  init = async () => {
    this.vm.loading = true;
    const response_clients = await this.mainAppRepository.getAllClients();
    const response_employees = await this.mainAppRepository.getAllEmployees();
    await this.getAllCases();
    this.vm.clients_list = response_clients.data;
    this.vm.employees_list = response_employees.data;
    this.vm.loading = false;
  };

  getAllCases = async () => {
    const response = await this.mainAppRepository.getAllCases();
    this.vm.all_cases = response?.data;
  };

  handleDateChange = (value) => {
    if (value == "clear" || value == null) {
      this.vm.todays_date = this.vm.origin_date;
      return;
    }
    this.vm.todays_date = value;
  };

  get allCases() {
    return this.vm.all_cases.map((item) => {
      const client = this.vm.clients_list.find(
        (client) => client?.id == item?.client_id
      );
      const employee = this.vm.employees_list.find(
        (employee) => employee?.id == item?.assignee_id
      );

      return {
        ...item,
        reference_number: `${client?.initials}.${item?.type}.${item?.id}`,
        client_business_name: client?.business_name || "Unknown",
        client_initials: client?.initials,
        assignee_name_surname: employee ? employee.name_surname : "Unassigned",
      };
    });
  }

  // Filter cases that were instructed today
  get instructedTodayCases() {
    return this.allCases.filter((item) => {
      return (
        item.date_instructed &&
        dayjs(item.date_instructed).isSame(this.vm.todays_date, "day")
      );
    });
  }

  // Filter cases that were checked today
  get checkedTodayCases() {
    return this.allCases.filter((item) => {
      return (
        item.checked_date &&
        dayjs(item.checked_date).isSame(this.vm.todays_date, "day")
      );
    });
  }

  // Filter cases that were settled today
  get settledTodayCases() {
    return this.allCases.filter((item) => {
      return (
        item.settled_date &&
        dayjs(item.settled_date).isSame(this.vm.todays_date, "day")
      );
    });
  }

  // Filter cases that were served today
  get servedTodayCases() {
    return this.allCases.filter((item) => {
      const offersData = item?.offers ? JSON.parse(item.offers) : [];
      if (offersData.length > 0) {
        const sentDate = dayjs(offersData[0]?.sent?.date);
        return sentDate.isSame(this.vm.todays_date, "day");
      }
      return false;
    });
  }

  // Pod case reminders
  get podCaseReminders() {
    return this.vm.all_cases
      .filter((case_details) => {
        const parsedOffersArray = JSON.parse(case_details.offers) || [];
        if (
          case_details.negotiable &&
          !case_details.pod_checked &&
          parsedOffersArray.length > 0 &&
          parsedOffersArray[0]?.sent?.formality
        ) {
          const podDueDate = dayjs(case_details.pod_due_date);
          const diffInDays = podDueDate.diff(this.vm.todays_date, "day");
          return diffInDays <= 3; // Reminder if 3 days or less remain
        }
        return false;
      })
      .map((case_details) => {
        const linkedClient = this.vm.clients_list.find(
          (client) => client.id == case_details.client_id
        );
        const podDueDate = dayjs(case_details.pod_due_date);
        const diffInDays = podDueDate.diff(this.vm.todays_date, "day");

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

  // Last offer reminders
  get lastOfferReminders() {
    const daysThreshold = 7;
    return this.vm.all_cases
      .filter((case_details) => {
        const parsedOffersArray = JSON.parse(case_details.offers) || [];
        if (
          case_details.negotiable &&
          parsedOffersArray.length > 0 &&
          !parsedOffersArray[parsedOffersArray.length - 1]?.received?.value
        ) {
          const lastOffer = parsedOffersArray[parsedOffersArray.length - 1];
          const sentDate = dayjs(lastOffer.sent.date);
          return sentDate.isBefore(
            this.vm.todays_date.subtract(daysThreshold, "day")
          );
        }
        return false;
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

  // Bill needs to be drafted reminders
  get billNeedsToBeDraftedReminders() {
    const daysThreshold = 7;
    return this.vm.all_cases
      .filter((case_details) => {
        if (
          case_details.status == "to-draft" ||
          case_details.status == "to-amend"
        ) {
          const dateInstructed = dayjs(case_details.date_instructed);
          return dateInstructed.isBefore(
            this.vm.todays_date.subtract(daysThreshold, "day")
          );
        }
        return false;
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

  // Bill needs to be served reminders
  get billNeedsToBeServedReminders() {
    const daysThreshold = 5;
    return this.vm.all_cases
      .filter((case_details) => {
        if (case_details.status == "checked" && case_details.negotiable) {
          const checkedDate = dayjs(case_details.checked_date);
          return checkedDate.isBefore(
            this.vm.todays_date.subtract(daysThreshold, "day")
          );
        }
        return false;
      })
      .map((case_details) => {
        const linkedClient = this.vm.clients_list.find(
          (client) => client.id == case_details.client_id
        );
        return {
          ...case_details,
          client_initials: linkedClient?.initials,
          alert: "bill-needs-to-be-served",
        };
      });
  }

  // Total number of notifications
  get notificationsNumber() {
    return (
      this.podCaseReminders.length +
      this.lastOfferReminders.length +
      this.billNeedsToBeDraftedReminders.length +
      this.billNeedsToBeServedReminders.length
    );
  }

  // All notifications in the menu
  get notificationsMenuList() {
    return [
      ...this.podCaseReminders,
      ...this.lastOfferReminders,
      ...this.billNeedsToBeDraftedReminders,
      ...this.billNeedsToBeServedReminders,
    ];
  }
}

export default AdminDashboardPresenter;
