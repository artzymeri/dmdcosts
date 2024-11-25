import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";

@injectable()
class AdminPorositePresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        all_orders: [],
        deletionModalOpen: false,
        orderToBeDeleted: null,
        sortingOption: 'receiver_name_surname',
        sortingMode: 'any',
        searchQuery: '',
        firstDateFilter: null,
        lastDateFilter: null,
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            allOrders: computed,
            getAllOrders: action.bound,
            deletionModalOpen: computed
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

    handleDeleteOrdersModal(value) {
        this.vm.deletionModalOpen = value
    }

    getAllOrders = async () => {
        const response = await this.mainAppRepository.getAllOrders();
        this.vm.all_orders = response?.data;
    }

    handleOrderCheck = (order_id) => {
        const orderToCheck = this.vm.all_orders.find((order) => order.id === order_id);
        orderToCheck.checked = !orderToCheck.checked;
    }

    deleteOrders = async () => {
        for (const order of this.vm.all_orders) {
            if (order.checked) {
                await this.mainAppRepository.deleteOrder(order?.id);
            }
        }
        await this.getAllOrders();
        this.handleDeleteOrdersModal(false)
    }

    get allOrders() {
        return this.vm.all_orders
            .map(item => ({
                ...item,
                progress: item.progress ?? 'request',
                checked: false
            }))
            .filter(item => {
                const itemValue = item[this.vm.sortingOption]?.toString().toLowerCase() || '';
                const matchesSearch = itemValue.includes(this.vm.searchQuery);
                const matchesSortingMode =
                    this.vm.sortingMode === 'any' || item.progress === this.vm.sortingMode;

                const matchesDateFilter = this.vm?.firstDateFilter && this.vm?.lastDateFilter
                    ? new Date(item?.createdAt).getTime() >= new Date(this.vm?.firstDateFilter).getTime() &&
                    new Date(item?.createdAt).getTime() <= new Date(this.vm?.lastDateFilter).getTime()
                    : true;

                return matchesSearch && matchesSortingMode && matchesDateFilter;
            });
    }


    get deletionModalOpen() {
        return this.vm.deletionModalOpen;
    }

    get printInvoicesButtonDisabled() {
        return this.allOrders.length === 0;
    }

    get deleteButtonDisabled() {
        return !this.vm.all_orders.some(order => order.checked);
    }

}

export default AdminPorositePresenter;