import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import AdminCaseStatusBanner from "@/components/admin/Cases/Case/AdminCaseStatusBanner";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminCaseDetailsNegotiationDetails from "@/components/admin/Cases/Case/AdminCaseDetailsNegotiationDetails";
import { useState } from "react";

const AdminCaseDetailsRightSide = ({ presenter }) => {
  const [invoiceLoader, setInvoiceLoader] = useState(false);
  const [checkPODModal, setCheckPODModal] = useState(false);
  const downloadInvoicePDF = async (case_id) => {
    setInvoiceLoader(true);
    const dateStr = presenter.vm.case_invoice_object.createdAt;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("en-GB");

    const finalDate = formattedDate.replaceAll("/", ".");

    try {
      const response = await axios.post(
        `https://dmdcosts.onrender.com/find-invoice`,
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
      setInvoiceLoader(false);
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
      <Dialog
        open={checkPODModal}
        onClose={() => {
          setCheckPODModal(false);
        }}
      >
        <DialogTitle borderBottom={"1px solid lightgray"}>
          Check POD
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingTop: "20px !important",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ background: "white" }}
              value={presenter.vm.pod_checked_date}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    presenter.handlePodCheckedDate(null);
                  },
                },
              }}
              label={"POD Checked Date"}
              format={"DD/MM/YYYY"}
              onChange={(newValue) => {
                presenter.handlePodCheckedDate(newValue);
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ background: "white" }}
              value={presenter.vm.pod_replies_due_date}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    presenter.handlePodRepliesDueDate(null);
                  },
                },
              }}
              label={"POD Replies due date"}
              format={"DD/MM/YYYY"}
              onChange={(newValue) => {
                presenter.handlePodRepliesDueDate(newValue);
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid lightgray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              presenter.clearCheckPOD();
              setCheckPODModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              presenter.changePODStatus();
            }}
          >
            Check POD
          </Button>
        </DialogActions>
      </Dialog>
      <div className="admin-case-details-status-container">
        <span style={{ fontWeight: "bold" }}>Case Status:</span>
        <AdminCaseStatusBanner status={presenter.caseDetails?.status} />
      </div>
      <div
        className="remove-mobile"
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
              if (!invoiceLoader) {
                downloadInvoicePDF(presenter.caseDetails?.id);
              }
            }}
          >
            {invoiceLoader ? (
              <CircularProgress
                sx={{
                  color: "white",
                  height: "25px !important",
                  width: "25px !important",
                }}
              />
            ) : (
              "Download Invoice"
            )}
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
        <AdminCaseDetailsNegotiationDetails
          className="remove-mobile"
          presenter={presenter}
        />
      )}
      {presenter.caseDetails.negotiable &&
        presenter.caseOffers.length > 0 &&
        presenter.caseOffers[0].sent.formality && (
          <div className="admin-case-details-right-side-pod-panel remove-mobile">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="admin-case-details-pod-banner">
                {presenter.POD ? "POD Checked" : "POD Unchecked"}
              </span>
              {presenter?.caseDetails?.pod_replies_sent && (
                <span className="admin-case-details-pod-banner">
                  POD Replies Sent
                </span>
              )}
            </div>
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
            {presenter?.POD && !presenter?.PODRepliesSent && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  presenter.markSentReplies();
                }}
              >
                Mark Sent Replies
              </Button>
            )}
            {!presenter.POD && (
              <Button
                onClick={() => {
                  setCheckPODModal(true);
                }}
                variant="contained"
                color={presenter.POD ? "error" : "success"}
              >
                Check POD
              </Button>
            )}
          </div>
        )}
    </div>
  );
};

export default observer(AdminCaseDetailsRightSide);
