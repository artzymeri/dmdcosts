import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { Alert, Button, Snackbar, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import InvoicesHeader from "./InvoicesHeader";
import InvoicesSecondHeader from "./InvoicesSecondHeader";
import InvoicesList from "./InvoicesList";
import ProduceInvoicesPopup from "./ProduceInvoicesPopup";

const InvoicesContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.InvoicesPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, [presenter.vm.refresh_state]);

  return (
    <>
      <Snackbar open={presenter?.snackbarBoolean} autoHideDuration={3000}>
        <Alert
          severity={presenter?.snackbarDetails?.title}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {presenter?.snackbarDetails?.message}
        </Alert>
      </Snackbar>
      <div className="admin-cases-content-container">
        <div className="admin-cases-content-title-container">
          <h2>Invoices</h2>
          <Tooltip title="Produce Invoices Popup" arrow>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                presenter.setProduceInvoicesPopup(true);
              }}
            >
              Produce Invoices
            </Button>
          </Tooltip>
        </div>
        <ProduceInvoicesPopup presenter={presenter} />
        <InvoicesHeader presenter={presenter} />
        <InvoicesSecondHeader presenter={presenter} />
        <InvoicesList presenter={presenter} />
      </div>
    </>
  );
};

export default observer(InvoicesContent);
