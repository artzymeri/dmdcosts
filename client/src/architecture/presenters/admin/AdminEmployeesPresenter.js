import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";

@injectable()
class AdminEmployeesPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        employeesData: [],
        deletionModalOpen: false,
        sortingOption: 'name_surname',
        sortingMode: 'a-z',
        searchQuery: ''
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getEmployeesData: action.bound,
            deleteEmployees: action.bound,
            handleSortingMode: action.bound,
            handleSortingOptions: action.bound,
            handleSearchFiltering: action.bound,
            setDeletionModal: action.bound,
            employeesData: computed,
            deletionModalOpen: computed,
            bulkDeletionButtonDisabled: computed
        });
    }

    getEmployeesData = async () => {
        const response = await this.mainAppRepository.getEmployeesData();
        this.vm.employeesData = response.data || [];
    }

    deleteEmployees = async () => {
        for (const user of this.vm.employeesData) {
            if (user.checked) {
                await this.mainAppRepository.deleteEmployee(user.id);
            }
        }
        this.vm.deletionModalOpen = false;
        await this.getEmployeesData()
    }

    setDeletionModal = (value) => {
        this.vm.deletionModalOpen = value;
    }

    selectEmployeeToDelete = (employee_id) => {
        const EmployeeToCheck = this.vm.employeesData.find((employee) => employee.id === employee_id)
        EmployeeToCheck.checked = !EmployeeToCheck.checked
    }

    handleSortingMode(event) {
        this.vm.sortingMode = event?.target?.value;
    }

    handleSortingOptions(event) {
        this.vm.sortingOption = event?.target?.value;
    }

    handleSearchFiltering(event) {i
        this.vm.searchQuery = event?.target?.value.toLowerCase();
    }

    get employeesData() {
        const normalizedData = this.vm.employeesData.map((user) => ({...user, checked: false}))

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
        return !this.vm.employeesData.some((employee) => employee.checked);
    }

}

export default AdminEmployeesPresenter;