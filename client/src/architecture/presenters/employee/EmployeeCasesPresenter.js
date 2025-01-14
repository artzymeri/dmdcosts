import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class EmployeeCasesPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    all_cases: [],
    sortingOption: "reference_number",
    sortingMode: "any",
    searchQuery: "",
    firstDateFilter: null,
    lastDateFilter: null,
    clients_list: [],
    employees_list: [],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allCases: computed,
      getAllCases: action.bound,
      init: action.bound,
    });
  }

  init = async () => {
    const response_clients = await this.mainAppRepository.getAllClients();
    const response_employees = await this.mainAppRepository.getAllEmployees();
    await this.getAllCases();
    this.vm.clients_list = response_clients.data;
    this.vm.employees_list = response_employees.data;
  };

  handleDatesChange(newValue, type) {
    this.vm[type] = newValue;
  }

  handleSortingOptions(event) {
    this.vm.sortingOption = event?.target?.value;
  }

  handleSortingMode(event) {
    this.vm.sortingMode = event?.target?.value;
  }

  handleSearchFiltering(event) {
    this.vm.searchQuery = event?.target?.value.toLowerCase();
  }

  getAllCases = async () => {
    const response = await this.mainAppRepository.getAllCases();
    this.vm.all_cases = response?.data;
  };

  get allCases() {
    return this.vm.all_cases
      .map((item) => {
        const client = this.vm.clients_list.find(
          (client) => client?.id == item?.client_id
        );
        const employee = this.vm.employees_list.find(
          (employee) => employee?.id == item?.assignee_id
        );

        return {
          ...item,
          checked: false,
          reference_number: `${client?.initials}.${item?.type}.${item?.id}`,
          client_business_name: client?.business_name || "Unknown",
          client_initials: client?.initials,
          assignee_name_surname: employee
            ? employee.name_surname
            : "Unassigned",
        };
      })
      .filter((item) => {
        const itemValue =
          item[this.vm.sortingOption]?.toString().toLowerCase() || "";
        const matchesSearch = itemValue.includes(this.vm.searchQuery);
        const matchesSortingMode =
          this.vm.sortingMode === "any" || item.status === this.vm.sortingMode;

        const matchesDateFilter =
          this.vm?.firstDateFilter && this.vm?.lastDateFilter
            ? new Date(item?.createdAt).getTime() >=
                new Date(this.vm?.firstDateFilter).getTime() &&
              new Date(item?.createdAt).getTime() <=
                new Date(this.vm?.lastDateFilter).getTime()
            : true;
        return matchesSearch && matchesSortingMode && matchesDateFilter;
      });
  }
}

export default EmployeeCasesPresenter;
