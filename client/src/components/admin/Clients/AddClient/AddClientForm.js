import { observer } from "mobx-react-lite";

const { TextField } = require("@mui/material");

const AddClientForm = (props) => {
  const { presenter } = props;

  return (
    <div className="admin-add-client-form-container">
      <TextField
        label="Firm Name"
        onChange={(e) => {
          presenter.handleChangeValues("business_name", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.business_name || ""}
        focused={presenter.vm?.newClientObject?.business_name ? true : false}
      />
      <TextField
        label="Address"
        onChange={(e) => {
          presenter.handleChangeValues("address", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.address || ""}
        focused={presenter.vm?.newClientObject?.address ? true : false}
      />
      <TextField
        label="Email Address"
        onChange={(e) => {
          presenter.handleChangeValues("email_address", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.email_address || ""}
        focused={presenter.vm?.newClientObject?.email_address ? true : false}
      />
      <TextField
        label="Price Per Hour"
        type="number"
        onChange={(e) => {
          presenter.handleChangeRatesConfig("per_hour_price", e?.target?.value);
        }}
        value={
          presenter.vm?.newClientObject?.rates_config?.per_hour_price || ""
        }
        focused={
          presenter.vm?.newClientObject?.rates_config?.per_hour_price
            ? true
            : false
        }
      />
    </div>
  );
};

export default observer(AddClientForm);
