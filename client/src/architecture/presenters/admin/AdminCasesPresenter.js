import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import dayjs from "dayjs";

@injectable()
class AdminCasesPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    all_cases: [],
    deletionModalOpen: false,
    caseToBeDeleted: null,
    sortingOption: "reference_number",
    sortingMode: "any",
    searchQuery: "",
    firstDateFilter: null,
    lastDateFilter: null,
    clients_list: [],
    employees_list: [],
    single_to_delete_case: null,
    loading: false,
    checked_cases: [],
    table_columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "reference_number", headerName: "Reference", width: 150 },
      { field: "claimant_name", headerName: "Claimant", width: 150 },
      {
        field: "client_reference_number",
        headerName: "Client Reference",
        width: 180,
      },
      { field: "assignee_name_surname", headerName: "Assignee", width: 150 },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        valueGetter: (row) => this.statusCheck(row),
      },
      {
        field: "date_instructed",
        headerName: "Date Instructed",
        width: 180,
        valueGetter: (row) => dayjs(row?.date_instructed).format("DD|MM|YYYY"),
      },
    ],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allCases: computed,
      getAllCases: action.bound,
      deletionModalOpen: computed,
      init: action.bound,
      singleToDeleteCase: computed,
      loading: computed,
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

  handleDeleteCasesModal(value) {
    if (this.vm.single_to_delete_case && value == false) {
      this.vm.single_to_delete_case = null;
    }
    this.vm.deletionModalOpen = value;
  }

  handleSingleDeletionCasesModal(case_id, value) {
    this.vm.deletionModalOpen = value;
    this.vm.single_to_delete_case = case_id;
  }

  getAllCases = async () => {
    const response = await this.mainAppRepository.getAllCases();
    this.vm.all_cases = response?.data;
  };

  handleCaseCheck = (cases_checked) => {
    this.vm.checked_cases = cases_checked;
  };

  deleteCases = async () => {
    for (const item of this.allCases) {
      if (item.checked) {
        await this.mainAppRepository.deleteCase(item?.id);
      }
    }
    await this.getAllCases();
    this.handleDeleteCasesModal(false);
  };

  statusCheck = (status) => {
    if (status == "to-draft") {
      return "To Draft";
    } else if (status == "drafted") {
      return "Drafted";
    } else if (status == "checked") {
      return "Checked";
    } else if (status == "served") {
      return "Served";
    } else if (status == "settled") {
      return "Settled";
    } else if (status == "paid") {
      return "Paid";
    } else if (status == "to-amend") {
      return "To Amend";
    }
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

        const isChecked = this.vm.checked_cases.includes(item?.id);

        return {
          ...item,
          checked: isChecked, // Set checked based on the ID being in checked_cases
          reference_number: `${client?.initials}.${item?.type}.${item?.id}`,
          client_business_name: client?.business_name || "Unknown",
          client_initials: client?.initials,
          assignee_name_surname: employee
            ? employee.name_surname
            : "Unassigned",
        };
      })
      .filter((item) => {
        const searchQuery = this.vm.searchQuery.toLowerCase();

        const matchesSearch =
          item.reference_number?.toLowerCase().includes(searchQuery) ||
          item.claimant_name?.toLowerCase().includes(searchQuery) ||
          item.client_reference_number?.toLowerCase().includes(searchQuery) ||
          item.assignee_name_surname?.toLowerCase().includes(searchQuery);

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

  get deletionModalOpen() {
    return this.vm.deletionModalOpen;
  }

  get singleToDeleteCase() {
    return this.vm.single_to_delete_case;
  }

  get printInvoicesButtonDisabled() {
    return this.allCases.length === 0;
  }

  get deleteButtonDisabled() {
    return !this.allCases.some((item) => item.checked);
  }

  get loading() {
    return this.vm.loading;
  }
}

export default AdminCasesPresenter;
