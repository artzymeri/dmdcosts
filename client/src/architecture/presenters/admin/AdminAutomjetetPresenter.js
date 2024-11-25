import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";

@injectable()
class AdminAutomjetetPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        automjetetData: [],
        deletionModalOpen: false,
        sortingOption: 'model',
        sortingMode: 'a-z',
        searchQuery: ''
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getAutomjetetData: action.bound,
            deleteAutomjetet: action.bound,
            selectAutomjetToDelete: action.bound,
            handleSortingMode: action.bound,
            handleSortingOptions: action.bound,
            handleSearchFiltering: action.bound,
            setDeletionModal: action.bound,
            automjetetData: computed,
            deletionModalOpen: computed,
            bulkDeletionButtonDisabled: computed
        });
    }

    getAutomjetetData = async () => {
        const response = await this.mainAppRepository.getAllTransports();
        this.vm.automjetetData = response.data || [];
    }

    deleteAutomjetet = async () => {
        for (const automjet of this.vm.automjetetData) {
            if (automjet.checked) {
                await this.mainAppRepository.deleteTransport(automjet.id);
            }
        }
        this.vm.deletionModalOpen = false;
        await this.getAutomjetetData()
    }

    setDeletionModal = (value) => {
        this.vm.deletionModalOpen = value;
    }

    selectAutomjetToDelete = (automjet_id) => {
        const automjetToCheck = this.vm.automjetetData.find((automjet) => automjet.id === automjet_id)
        automjetToCheck.checked = !automjetToCheck.checked
    }

    handleSortingMode(event) {
        this.vm.sortingMode = event?.target?.value;
    }

    handleSortingOptions(event) {
        this.vm.sortingOption = event?.target?.value;
    }

    handleSearchFiltering(event) {
        this.vm.searchQuery = event?.target?.value.toLowerCase();
    }

    get automjetetData() {
        const normalizedData = this.vm.automjetetData.map((automjet) => ({...automjet, checked: false}))

        const filteredData = normalizedData.filter(item => {
            const itemValue = item[this.vm.sortingOption]?.toString().toLowerCase() || '';
            return itemValue.includes(this.vm.searchQuery);
        });

        if (this.vm.sortingMode === 'a-z') {
            filteredData.sort((a, b) => {
                const aValue = a[this.vm.sortingOption] || '';
                const bValue = b[this.vm.sortingOption] || '';
                return aValue.localeCompare(bValue);
            });
        } else if (this.vm.sortingMode === 'z-a') {
            filteredData.sort((a, b) => {
                const aValue = a[this.vm.sortingOption] || '';
                const bValue = b[this.vm.sortingOption] || '';
                return bValue.localeCompare(aValue);
            });
        }

        return filteredData;
    }


    get deletionModalOpen() {
        return this.vm.deletionModalOpen;
    }

    get bulkDeletionButtonDisabled() {
        return !this.vm.automjetetData.some((automjet) => automjet.checked);
    }

}

export default AdminAutomjetetPresenter;