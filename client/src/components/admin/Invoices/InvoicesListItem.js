import { observer } from "mobx-react-lite";
import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import dayjs from "dayjs";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const InvoicesListItem = (props) => {
  const { item, presenter } = props;

  const router = useRouter();
  const cases_array = JSON.parse(item?.cases_involved);
  const firstCaseId = cases_array[0];

  const [loading, setLoading] = useState(false);

  const downloadInvoicePDF = async (invoice) => {
    setLoading(true);
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
          presenter.getClientDetailsByInvoice(invoice).business_name
        } ${finalDate}.pdf`
      );
      downloadLink.click();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`admin-invoices-list-item`}>
      <Checkbox
        className="remove-mobile"
        onClick={(e) => {
          e.stopPropagation();
          presenter.selectInvoice(item?.id);
        }}
      />
      <Tooltip placement="top-start" title={`Invoice ID: ${item?.id}`} arrow>
        <span>{`#${item?.id}`}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={item?.client_business_name} arrow>
        <span>{item?.client_business_name}</span>
      </Tooltip>
      <span className="remove-mobile">{presenter.getTypeOfInvoice(item)}</span>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={item?.paid ? "Invoice is paid" : "Invoice has not been paid yet"}
        arrow
      >
        <span>{item?.paid ? "Paid" : "Unpaid"}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top-start"
        title={dayjs(item?.createdAt).format("DD|MM|YYYY")}
        arrow
      >
        <span>{dayjs(item?.createdAt).format("DD|MM|YYYY")}</span>
      </Tooltip>
      <Tooltip
        className="remove-mobile"
        placement="top"
        title="Redirect to Case"
        arrow
      >
        <Button
          disabled={presenter.getTypeOfInvoice(item) == "Bundle"}
          color="primary"
          variant="contained"
          onClick={() => {
            router.push(`/case/${firstCaseId}`);
          }}
        >
          Go To Case
        </Button>
      </Tooltip>
      {loading ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            color="success"
            sx={{ height: "30px !important", width: "30px !important" }}
          />
        </div>
      ) : (
        <Tooltip placement="top" title={"Click to download case"} arrow>
          <IconButton
            color="success"
            onClick={(e) => {
              if (!loading) {
                e.stopPropagation();
                downloadInvoicePDF(item);
              }
            }}
          >
            <Download />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default observer(InvoicesListItem);
