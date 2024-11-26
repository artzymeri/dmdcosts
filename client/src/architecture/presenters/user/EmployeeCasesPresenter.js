import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class EmployeeCasesPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        clientOrders: [],
        cancellationModalOpen: false,
        orderToBeCancelled: null,
        sortingOption: 'receiver_name_surname',
        sortingMode: 'any',
        searchQuery: ''
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            clientOrders: computed,
            getClientOrders: action.bound,
            cancellationModalOpen: computed
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

    setCancellationModal = (boolean, value) => {
        this.vm.cancellationModalOpen = boolean;
        if (boolean == false) {
            this.vm.orderToBeCancelled = null
        } else {
            if (value == 'none') {
                return;
            }
            this.vm.orderToBeCancelled = value
        }
    }

    getClientOrders = async () => {
        let clientId = await JSON.parse(Cookies.get('employeeData')).id
        const response = await this.mainAppRepository.getClientOrders(clientId);
        this.vm.clientOrders = response?.data;
    }

    cancelOrder = async () => {
        await this.mainAppRepository.cancelOrder(this.vm.orderToBeCancelled);
        await this.getClientOrders();
        this.setCancellationModal(false, null)
    }

    get clientOrders() {
        const normalizedData = this.vm.clientOrders.map(item => {
            return {
                ...item,
                progress: item.progress === null ? 'request' : item.progress
            };
        });

        const filteredData = normalizedData.filter(item => {
            const itemValue = item[this.vm.sortingOption]?.toString().toLowerCase() || '';
            const matchesSearch = itemValue.includes(this.vm.searchQuery);

            const matchesSortingMode =
                this.vm.sortingMode === 'any' || item.progress === this.vm.sortingMode;

            return matchesSearch && matchesSortingMode;
        });

        return filteredData;
    }

    get cancellationModalOpen() {
        return this.vm.cancellationModalOpen;
    }

}

export default EmployeeCasesPresenter;