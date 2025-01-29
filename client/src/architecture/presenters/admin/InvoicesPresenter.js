import { TYPES } from "@/architecture/ioc/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { makeObservable, action, observable, computed } from "mobx";
import dayjs from "dayjs";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";

@injectable()
class InvoicesPresenter {
  @inject(TYPES.MainAppRepository) mainAppRepository;

  vm = {
    all_invoices: [],
    all_cases: [],
    deletionModalOpen: false,
    invoiceToBeDeleted: null,
    sortingOption: "id",
    sortingMode: "any",
    searchQuery: "",
    firstDateFilter: null,
    lastDateFilter: null,
    clients_list: [],
    employees_list: [],
    single_to_delete_invoice: null,
    produce_invoices_popup: null,
    produce_invoices_mode: "single",
    selected_client: null,
    selected_cases: [],
    snackbar_boolean: false,
    snackbar_details: null,
    refresh_state: 1,
    loading: false,
    checked_invoices: [],
    table_columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "client_business_name", headerName: "Reference", width: 150 },
      {
        field: "cases_involved",
        headerName: "Type",
        width: 120,
        valueGetter: (row) => {
          return this.getTypeOfInvoice(row);
        },
      },
      {
        field: "paid",
        headerName: "Paid",
        width: 120,
        valueGetter: (row) => (row == true ? "Paid" : "Unpaid"),
      },
      {
        field: "createdAt",
        headerName: "Date Created",
        width: 180,
        valueGetter: (row) => dayjs(row).format("DD|MM|YYYY"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 180,
        renderCell: (params) => {
          return (
            <Button
              color="success"
              onClick={(e) => {
                e.stopPropagation();
                this.downloadInvoicePDF(params?.row);
              }}
            >
              <Download />
            </Button>
          );
        },
      },
    ],
  };

  constructor() {
    makeObservable(this, {
      vm: observable,
      allInvoices: computed,
      getAllInvoices: action.bound,
      deletionModalOpen: computed,
      init: action.bound,
      setProduceInvoicesMode: action.bound,
      singleToDeleteInvoice: computed,
      produceInvoicesPopup: computed,
      produceInvoicesMode: computed,
      allClients: computed,
      snackbarBoolean: computed,
      snackbarDetails: computed,
      produceInvoices: action.bound,
      loading: computed,
    });
  }

  init = async () => {
    this.vm.loading = true;
    const response_clients = await this.mainAppRepository.getAllClients();
    const response_employees = await this.mainAppRepository.getAllEmployees();
    const response_cases = await this.mainAppRepository.getAllCases();
    await this.getAllInvoices();
    this.vm.clients_list = response_clients.data;
    this.vm.selected_client = response_clients.data[0];
    this.vm.employees_list = response_employees.data;
    this.vm.all_cases = response_cases.data;
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
    this.vm.searchQuery = event?.target?.value.toLowerInvoice();
  }

  handleDeleteInvoicesModal(value) {
    this.vm.deletionModalOpen = value;
  }

  getAllInvoices = async () => {
    const response = await this.mainAppRepository.getAllInvoices();
    this.vm.all_invoices = response?.data;
  };

  handleInvoiceCheck = (invoices_checked) => {
    this.vm.checked_invoices = invoices_checked;
  };

  deleteInvoices = async () => {
    for (const item of this.allInvoices) {
      if (item.checked) {
        await this.mainAppRepository.deleteInvoice(item?.id);
      }
    }
    await this.getAllInvoices();
    this.handleDeleteInvoicesModal(false);
  };

  setProduceInvoicesPopup(boolean) {
    this.vm.produce_invoices_popup = boolean;
  }

  setProduceInvoicesMode(mode) {
    for (const c of this.vm.all_cases) {
      c.selected = false;
    }
    this.vm.produce_invoices_mode = mode;
  }

  setSnackbar(value, details) {
    this.vm.snackbar_boolean = value;
    this.vm.snackbar_details = details;
    setTimeout(() => {
      this.vm.snackbar_boolean = false;
      this.vm.snackbar_details = null;
    }, 3000);
  }

  produceInvoices = async () => {
    const selectedCases = this.vm.all_cases.filter((c) => c.selected == true);
    if (this.produceInvoicesMode == "single") {
      const response = await this.mainAppRepository.produceSingleInvoices(
        selectedCases
      );
      this.setSnackbar(true, response.data);
      this.vm.refresh_state += 1;
    }
    if (this.produceInvoicesMode == "bundle") {
      const response = await this.mainAppRepository.produceBundleInvoices(
        this.vm.selected_client.id,
        selectedCases
      );
      this.setSnackbar(true, response.data);
      this.vm.refresh_state += 1;
    }
  };

  selectCase(case_id) {
    const selecteInvoice = this.vm.all_cases.find((item) => item.id == case_id);
    selecteInvoice.selected = !selecteInvoice.selected;
  }

  selectInvoice(invoice_id) {
    const selecteInvoice = this.vm.all_invoices.find(
      (item) => item.id == invoice_id
    );
    selecteInvoice.selected = !selecteInvoice.selected;
  }

  getClientDetailsByInvoice(invoice) {
    const foundClient = this.vm.clients_list.find(
      (c) => c.id == invoice.client_id
    );
    return foundClient;
  }

  getClientDetailsByCase(case_details) {
    const foundClient = this.vm.clients_list.find(
      (c) => c.id == case_details.client_id
    );
    return foundClient;
  }

  getTypeOfInvoice(cases_involved) {
    const caseInvolved = this.vm.all_cases.find(
      (c) => c.id == JSON.parse(cases_involved)[0]
    );
    if (caseInvolved?.negotiable) {
      return "Single";
    } else {
      return "Bundle";
    }
  }

  setSelectedClient(client) {
    this.vm.selected_client = client;
  }

  downloadInvoicePDF = async (invoice) => {
    console.log(invoice);
    this.vm.loading = true;
    const dateStr = invoice.createdAt;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("en-GB"); // Output: 05/01/2025

    const finalDate = formattedDate.replaceAll("/", ".");

    try {
      const response = await axios.post(
        `https://dmdcosts.onrender.com/download-invoice`,
        { invoice },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute(
        "download",
        `${
          this.getClientDetailsByInvoice(invoice).business_name
        } ${finalDate}.pdf`
      );
      downloadLink.click();
      this.vm.loading = false;
    } catch (error) {
      console.error(error);
    }
  };

  get allInvoices() {
    return this.vm.all_invoices
      .map((item) => {
        const client = this.vm.clients_list.find(
          (client) => client?.id == item?.client_id
        );
        const employee = this.vm.employees_list.find(
          (employee) => employee?.id == item?.assignee_id
        );

        const isChecked = this.vm.checked_invoices.includes(item?.id);

        return {
          ...item,
          checked: isChecked,
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

  get casesToProduce() {
    return this.vm.all_cases.filter((case_item) => {
      return !this.vm.all_invoices.some((invoice) => {
        try {
          const casesInvolved = JSON.parse(invoice.cases_involved || "[]");

          return casesInvolved.includes(case_item.id);
        } catch (error) {
          console.error("Error parsing cases_involved:", error);
          return false;
        }
      });
    });
  }

  get singleToProduceCases() {
    return this.casesToProduce.filter(
      (case_item) => case_item.negotiable == true
    );
  }

  get bundleToProduceCases() {
    return this.casesToProduce
      .filter((case_item) => case_item.negotiable == false)
      .filter(
        (case_item) => case_item.client_id == this.vm.selected_client?.id
      );
  }

  get deletionModalOpen() {
    return this.vm.deletionModalOpen;
  }

  get singleToDeleteInvoice() {
    return this.vm.single_to_delete_invoice;
  }

  get printInvoicesButtonDisabled() {
    return this.allInvoices.length === 0;
  }

  get deleteButtonDisabled() {
    return !this.allInvoices.some((item) => item.checked);
  }

  get produceInvoicesPopup() {
    return this.vm.produce_invoices_popup;
  }

  get produceInvoicesMode() {
    return this.vm.produce_invoices_mode;
  }

  get allClients() {
    return this.vm.clients_list;
  }

  get snackbarBoolean() {
    return this.vm.snackbar_boolean;
  }

  get snackbarDetails() {
    return this.vm.snackbar_details;
  }

  get loading() {
    return this.vm.loading;
  }
}

export default InvoicesPresenter;
