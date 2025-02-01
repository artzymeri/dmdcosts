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
    todays_date: dayjs(),
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allCases: computed,
      instructedTodayCases: computed,
      checkedTodayCases: computed,
      settledTodayCases: computed,
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
    console.log(value);
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
}

export default AdminDashboardPresenter;
