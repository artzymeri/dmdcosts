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

const AdminCaseDetailsRightSide = ({ presenter }) => {
  const generatePDF = async (caseData) => {
    const dateObject = new Date(caseData?.createdAt);
    const formattedDate = dateObject.toLocaleString();
    try {
      const response = await axios.post(
        `http://localhost:8080/generatepdfonly/${caseData?.id}`,
        { caseData },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute(
        "download",
        `Case ${caseData?.id} ${formattedDate}.pdf`
      );
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-case-details-right-side">
      <div className="admin-case-details-status-container">
        <span style={{ fontWeight: "bold" }}>Case Status:</span>
        <AdminCaseStatusBanner status={presenter.caseDetails?.status} />
      </div>
      <div className="admin-case-details-right-side-qr-code-container">
        <div className="admin-case-details-right-side-qr-code-container-description">
          <span className="admin-case-details-right-side-qr-code-container-description-title">
            Scan QR-CODE
          </span>
          <p>
            Using your smartphone, you can scan this <b>QR-CODE</b> anytime to
            view the details and progress of this case!{" "}
          </p>
        </div>
        <img src={presenter.caseDetails?.qr_code} height="200px" />
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
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          onClick={() => {
            generatePDF(presenter?.caseDetails);
          }}
        >
          Download Invoice
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gap: "10px",
          width: "100%",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
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
                presenter.setSnackbar(true, res.data);
              });
            }}
          >
            {presenter?.vm?.status_options &&
              presenter?.vm?.status_options.map((option) => {
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
        <Tooltip title="Click to change payment status" arrow>
          <Button
            size="large"
            fullWidth
            variant="contained"
            color={presenter.caseDetails?.paid ? "error" : "success"}
            onClick={() => {
              presenter
                .handleCasePaymentChange(!presenter.caseDetails.paid)
                .then((res) => {
                  presenter.setSnackbar(true, res.data);
                });
            }}
          >
            {presenter.caseDetails?.paid ? "Mark as Unpaid" : "Mark as Paid"}
          </Button>
        </Tooltip>
      </div>
      <div
        style={{
          display: "grid",
          gap: "10px",
          width: "100%",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {!presenter?.caseDetails?.served && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="admin-case-details-right-side-last-offer-date-picker"
              sx={{ width: "100%", height: "42px" }}
              value={presenter.vm?.case_details?.last_offer_date}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    presenter.handleLastOfferDateChange(null);
                  },
                },
                textField: {
                  helperText: "Change Last Date Offer",
                },
              }}
              format={"DD/MM/YYYY"}
              onChange={(newValue) => {
                presenter.handleLastOfferDateChange(newValue);
              }}
            />
          </LocalizationProvider>
        )}
        <Tooltip title="Click to change serving status" arrow>
          <Button
            size="large"
            fullWidth
            style={{
              gridColumn: presenter?.caseDetails?.served ? "span 2" : undefined,
            }}
            variant="contained"
            color={presenter.caseDetails?.served ? "error" : "success"}
            disabled={presenter.servingButtonDisabled}
            onClick={() => {
              presenter
                .handleCaseServingChange(!presenter.caseDetails.served)
                .then((res) => {
                  presenter.setSnackbar(true, res.data);
                });
            }}
          >
            {presenter.caseDetails?.served
              ? "Mark as Unserved"
              : "Mark as Served"}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default observer(AdminCaseDetailsRightSide);
