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
    sortingOption: "business_name",
    sortingMode: "a-z",
    searchQuery: "",
    firstDateFilter: null,
    lastDateFilter: null,
    single_to_delete_client: null,
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allClients: computed,
      deletionModalOpen: computed,
      deleteButtonDisabled: computed,
      singleToDeleteClient: computed,
      getAllClients: action.bound,
      deleteClients: action.bound,
      handleSortingOptions: action.bound,
      handleSortingMode: action.bound,
      handleSearchFiltering: action.bound,
      handleDeleteClientsModal: action.bound,
      handleSingleDeletionClientsModal: action.bound,
      handleClientCheck: action.bound,
    });
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
    if (this.vm.single_to_delete_client && value == false) {
      this.vm.single_to_delete_client = null;
    }
    this.vm.deletionModalOpen = value;
  }

  handleSingleDeletionClientsModal(client_id, value) {
    this.vm.deletionModalOpen = value;
    this.vm.single_to_delete_client = client_id;
  }

  getAllClients = async () => {
    const response = await this.mainAppRepository.getAllClients();
    this.vm.all_clients = response?.data;
  };

  handleClientCheck = (client_id) => {
    const clientToCheck = this.vm.all_clients.find(
      (client) => client.id == client_id
    );
    clientToCheck.checked = !clientToCheck.checked;
  };

  deleteClients = async () => {
    if (this.vm.single_to_delete_client) {
      await this.mainAppRepository.deleteClient(
        this.vm.single_to_delete_client
      );
      this.vm.single_to_delete_client = null;
      await this.getAllClients();
      this.handleDeleteClientsModal(false);
      return;
    }
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

  get deleteButtonDisabled() {
    return !this.vm.all_clients.some((client) => client.checked);
  }

  get singleToDeleteClient() {
    return this.vm.single_to_delete_client
      ? this.vm.all_clients.find(
          (client) => client.id === this.vm.single_to_delete_client
        )
      : null;
  }
}

export default AdminClientsPresenter;
