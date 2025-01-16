import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import AdminCaseStatusBanner from "@/components/admin/Cases/Case/AdminCaseStatusBanner";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminCaseDetailsNegotiationDetails from "@/components/admin/Cases/Case/AdminCaseDetailsNegotiationDetails";

const AdminCaseDetailsRightSide = ({ presenter }) => {
  const downloadInvoicePDF = async (case_id) => {
    const dateStr = presenter.vm.case_invoice_object.createdAt;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("en-GB");

    const finalDate = formattedDate.replaceAll("/", ".");

    try {
      const response = await axios.post(
        `http://localhost:3306/find-invoice`,
        { case_id },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute(
        "download",
        `${presenter.clientDetails.business_name} ${finalDate}.pdf`
      );
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  const customStatusText = (case_status) => {
    if (case_status == "checked") {
      return "Serve";
    }
    if (case_status == "served") {
      return "Settle";
    }
    if (case_status == "settled") {
      return "Mark as Paid";
    }
  };

  const changeCaseStatus = (case_status) => {
    if (case_status == "checked") {
      if (presenter.caseDetails.negotiable) {
        presenter.setAddOfferModal(true, "sent");
      } else {
        presenter.changeCaseStatus(presenter.caseDetails.id, "served");
      }
    }
    if (case_status == "served") {
      presenter.changeCaseStatus(presenter.caseDetails.id, "settled");
    }
    if (case_status == "settled") {
      presenter.changeCaseStatus(presenter.caseDetails.id, "paid");
    }
  };

  return (
    <div className="admin-case-details-right-side">
      <div className="admin-case-details-status-container">
        <span style={{ fontWeight: "bold" }}>Case Status:</span>
        <AdminCaseStatusBanner status={presenter.caseDetails?.status} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          size="large"
          fullWidth
          onClick={() => {
            presenter.setDeletionConfirmationModal(true);
          }}
        >
          Delete Case
        </Button>
        {presenter.alreadyHasInvoice ? (
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            onClick={() => {
              downloadInvoicePDF(presenter.caseDetails?.id);
            }}
          >
            Download Invoice
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            onClick={() => {
              presenter.insertInvoiceToDatabase();
            }}
          >
            Create Invoice
          </Button>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gap: "10px",
          width: "100%",
          gridTemplateColumns: "1fr",
        }}
      >
        {presenter.showStatusDropdown ? (
          <FormControl fullWidth size="small">
            <InputLabel
              sx={{ padding: "0px 5px", background: "white" }}
              id="status-select"
            >
              Change Case Status
            </InputLabel>
            <Select
              size="small"
              labelId="status-select"
              variant="outlined"
              onChange={(event) => {
                presenter.handleCaseStatusChange(event).then((res) => {
                  if (res) {
                    presenter.setSnackbar(true, res.data);
                  }
                });
              }}
            >
              {presenter?.vm?.status_options &&
                presenter.caseDetails.negotiable &&
                presenter?.vm?.status_options.map((option) => {
                  if (
                    option.value !== presenter.caseDetails?.status &&
                    option.value !== "served" &&
                    option.value !== "settled" &&
                    option.value !== "paid"
                  ) {
                    return (
                      <MenuItem key={option?.id} value={option?.value}>
                        {option?.title}
                      </MenuItem>
                    );
                  }
                })}
              {presenter?.vm?.non_negotiable_status_options &&
                !presenter.caseDetails.negotiable &&
                presenter?.vm?.non_negotiable_status_options.map((option) => {
                  if (option.value !== presenter.caseDetails?.status) {
                    return (
                      <MenuItem key={option?.id} value={option?.value}>
                        {option?.title}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
        ) : (
          presenter.caseDetails.status !== "paid" && (
            <Button
              variant="contained"
              onClick={() => {
                changeCaseStatus(presenter.caseDetails.status);
              }}
            >
              {customStatusText(presenter.caseDetails.status)}
            </Button>
          )
        )}
      </div>
      {presenter.caseDetails?.negotiable && (
        <AdminCaseDetailsNegotiationDetails presenter={presenter} />
      )}
      {presenter.caseDetails.negotiable &&
        presenter.caseOffers.length > 0 &&
        presenter.caseOffers[0].sent.formality && (
          <div className="admin-case-details-right-side-pod-panel">
            <span className="admin-case-details-pod-banner">
              {presenter.POD ? "POD Checked" : "POD Unchecked"}
            </span>
            {!presenter.POD && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ background: "white" }}
                  value={presenter.vm.extended_pod_due_date}
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => {
                        presenter.handleExtendedPodDueDate(null);
                      },
                    },
                  }}
                  label={"Extend POD due date"}
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => {
                    presenter.handleExtendedPodDueDate(newValue);
                  }}
                />
              </LocalizationProvider>
            )}
            <Button
              onClick={() => {
                presenter.changePODStatus();
              }}
              variant="contained"
              color={presenter.POD ? "error" : "success"}
            >
              {presenter.POD ? "Uncheck POD" : "Check POD"}
            </Button>
          </div>
        )}
    </div>
  );
};

export default observer(AdminCaseDetailsRightSide);
