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
          Create Invoice
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gap: "10px",
          width: "100%",
          gridTemplateColumns: "1fr",
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
      </div>
    </div>
  );
};

export default observer(AdminCaseDetailsRightSide);
