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
    sortingMode: "a-z",
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
      .map((client) => ({
        ...client,
        checked: false,
      }))
      .filter((client) => {
        const clientValue =
          client[this.vm.sortingOption]?.toString().toLowerCase() || "";
        return clientValue.includes(this.vm.searchQuery);
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

  get printInvoicesButtonDisabled() {
    return this.allClients.length === 0;
  }

  get deleteButtonDisabled() {
    return !this.vm.all_clients.some((client) => client.checked);
  }
}

export default AdminClientsPresenter;
