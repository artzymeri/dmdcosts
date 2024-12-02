import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class AdminEmployeesPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    all_employees: [],
    deletionModalOpen: false,
    sortingOption: "username",
    sortingMode: "a-z",
    searchQuery: "",
    firstDateFilter: null,
    lastDateFilter: null,
    single_to_delete_employee: null,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allEmployees: computed,
      deletionModalOpen: computed,
      deleteButtonDisabled: computed,
      singleToDeleteEmployee: computed,
      getAllEmployees: action.bound,
      deleteEmployees: action.bound,
      handleSortingOptions: action.bound,
      handleSortingMode: action.bound,
      handleSearchFiltering: action.bound,
      handleDeleteEmployeesModal: action.bound,
      handleSingleDeletionEmployeesModal: action.bound,
      handleEmployeeCheck: action.bound,
    });
  }

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

  handleDeleteEmployeesModal(value) {
    if (this.vm.single_to_delete_employee && value == false) {
      this.vm.single_to_delete_employee = null;
    }
    this.vm.deletionModalOpen = value;
  }

  handleSingleDeletionEmployeesModal(employee_id, value) {
    this.vm.deletionModalOpen = value;
    this.vm.single_to_delete_employee = employee_id;
  }

  getAllEmployees = async () => {
    const response = await this.mainAppRepository.getAllEmployees();
    this.vm.all_employees = response?.data;
  };

  handleEmployeeCheck = (employee_id) => {
    const employeeToCheck = this.vm.all_employees.find(
      (employee) => employee.id == employee_id
    );
    employeeToCheck.checked = !employeeToCheck.checked;
  };

  deleteEmployees = async () => {
    if (this.vm.single_to_delete_employee) {
      await this.mainAppRepository.deleteEmployee(
        this.vm.single_to_delete_employee
      );
      this.vm.single_to_delete_employee = null;
      await this.getAllEmployees();
      this.handleDeleteEmployeesModal(false);
      return;
    }
    for (const employee of this.vm.all_employees) {
      if (employee.checked) {
        await this.mainAppRepository.deleteEmployee(employee?.id);
      }
    }
    await this.getAllEmployees();
    this.handleDeleteEmployeesModal(false);
  };

  get allEmployees() {
    return this.vm.all_employees
      .map((employee) => ({
        ...employee,
        checked: false,
      }))
      .filter((employee) => {
        const employeeValue =
          employee[this.vm.sortingOption]?.toString().toLowerCase() || "";
        return employeeValue.includes(this.vm.searchQuery);
      })
      .sort((a, b) => {
        const aValue = a[this.vm.sortingOption]?.toString().toLowerCase() || "";
        const bValue = b[this.vm.sortingOption]?.toString().toLowerCase() || "";
        if (this.vm.sortingMode === "a-z") {
          return aValue.localeCompare(bValue);
        } else if (this.vm.sortingMode === "z-a") {
          return bValue.localeCompare(aValue);
        }
        return 0;
      });
  }

  get deletionModalOpen() {
    return this.vm.deletionModalOpen;
  }

  get deleteButtonDisabled() {
    return !this.vm.all_employees.some((employee) => employee.checked);
  }

  get singleToDeleteEmployee() {
    return this.vm.single_to_delete_employee
      ? this.vm.all_employees.find(
          (employee) => employee.id === this.vm.single_to_delete_employee
        )
      : null;
  }
}

export default AdminEmployeesPresenter;
