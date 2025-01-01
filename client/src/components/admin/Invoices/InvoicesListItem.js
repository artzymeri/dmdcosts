import { observer } from "mobx-react-lite";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { Download } from "@mui/icons-material";
import dayjs from "dayjs";
import axios from "axios";

const InvoicesListItem = (props) => {
  const { item, presenter } = props;

  const downloadInvoicePDF = async (invoice) => {
    try {
      const response = await axios.post(
        `http://localhost:7070/download-invoice`,
        { invoice },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute("download", `Case ${invoice?.id} ${`123`}.pdf`);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`admin-cases-list-item`}>
      <Checkbox
        onClick={(e) => {
          e.stopPropagation();
          presenter.handleCaseCheck(item?.id);
        }}
      />
      <Tooltip placement="top-start" title={"aaa"} arrow>
        <span>{`aaa`}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={item?.client_business_name} arrow>
        <span>{item?.client_business_name}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={item?.assignee_name_surname} arrow>
        <span>{item?.assignee_name_surname}</span>
      </Tooltip>
      <Tooltip placement="top-start" title={"aaa"} arrow>
        <span>aaa</span>
      </Tooltip>
      <Tooltip
        placement="top-start"
        title={item?.negotiable ? "Negotiable" : "Non-Negotiable"}
        arrow
      >
        <span>{item?.negotiable ? "Negotiable" : "Non-Negotiable"}</span>
      </Tooltip>
      <Tooltip
        placement="top-start"
        title={dayjs(item?.createdAt).format("DD|MM|YYYY")}
        arrow
      >
        <span>{dayjs(item?.createdAt).format("DD|MM|YYYY")}</span>
      </Tooltip>
      <Tooltip placement="top" title="Click to download case" arrow>
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            downloadInvoicePDF(item);
          }}
        >
          <Download />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default observer(InvoicesListItem);
