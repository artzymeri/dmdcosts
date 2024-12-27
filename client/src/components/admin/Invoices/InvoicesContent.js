import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import InvoicesHeader from "./InvoicesHeader";
import InvoicesSecondHeader from "./InvoicesSecondHeader";
import InvoicesList from "./InvoicesList";

const InvoicesContent = () => {
  const router = useRouter();

  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminCasesPresenter)
  );

  useEffect(() => {
    presenter.init();
  }, []);

  return (
    <div className="admin-cases-content-container">
      <div className="admin-cases-content-title-container">
        <h2>Invoices</h2>
        <Tooltip title="Produce Invoices Popup" arrow>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
            //   router.push("/addcase");
            }}
          >
            Produce Invoices
          </Button>
        </Tooltip>
      </div>
      <InvoicesHeader presenter={presenter} />
      <InvoicesSecondHeader presenter={presenter} />
      <InvoicesList presenter={presenter} />
    </div>
  );
};

export default observer(InvoicesContent);
