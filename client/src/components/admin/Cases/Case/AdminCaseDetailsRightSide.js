import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import AdminCaseStatusBanner from "@/components/admin/Cases/Case/AdminCaseStatusBanner";
import axios from "axios";
import { Delete, Download } from "@mui/icons-material";

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
          fullWidth
          onClick={() => {
            presenter.cancelOrder(presenter?.caseDetails?.id);
          }}
        >
          Delete Case
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => {
            generatePDF(presenter?.caseDetails);
          }}
        >
          Download Invoice
        </Button>
      </div>
      <div className="admin-case-details-right-side-employees-involved">
        to be added...
      </div>
    </div>
  );
};

export default observer(AdminCaseDetailsRightSide);
