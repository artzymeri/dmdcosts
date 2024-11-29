import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";

@injectable()
class AdminClientsPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    all_clients: [],
    deletionModalOpen: false,
    clientToBeDeleted: null,
    sortingOption: "business_name",
    sortingMode: "any",
    searchQuery: "",
    firstDateFilter: null,
    lastDateFilter: null,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allClients: computed,
      getAllClients: action.bound,
      deletionModalOpen: computed,
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

  handleDeleteClientsModal(value) {
    this.vm.deletionModalOpen = value;
  }

  getAllClients = async () => {
    const response = await this.mainAppRepository.getAllClients();
    this.vm.all_clients = response?.data;
  };

  handleClientCheck = (client_id) => {
    const clientToCheck = this.vm.all_clients.find(
      (client) => client.id === client_id
    );
    clientToCheck.checked = !clientToCheck.checked;
  };

  deleteClients = async () => {
    for (const client of this.vm.all_clients) {
      if (client.checked) {
        await this.mainAppRepository.deleteClient(client?.id);
      }
    }
    await this.getAllClients();
    this.handleDeleteClientsModal(false);
  };

  get allClients() {
    return this.vm.all_clients
      .map((item) => ({
        ...item,
        progress: item.progress ?? "request",
        checked: false,
      }))
      .filter((item) => {
        const itemValue =
          item[this.vm.sortingOption]?.toString().toLowerCase() || "";
        const matchesSearch = itemValue.includes(this.vm.searchQuery);
        const matchesSortingMode =
          this.vm.sortingMode === "any" ||
          item.progress === this.vm.sortingMode;

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

  get printInvoicesButtonDisabled() {
    return this.allClients.length === 0;
  }

  get deleteButtonDisabled() {
    return !this.vm.all_clients.some((client) => client.checked);
  }
}

export default AdminClientsPresenter;
