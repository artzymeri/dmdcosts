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
        label="Address 1"
        onChange={(e) => {
          presenter.handleChangeValues("address1", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.address1 || ""}
        focused={presenter.vm?.newClientObject?.address1 ? true : false}
      />
      <TextField
        label="Address 2"
        onChange={(e) => {
          presenter.handleChangeValues("address2", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.address2 || ""}
        focused={presenter.vm?.newClientObject?.address2 ? true : false}
      />
      <TextField
        label="Address 3"
        onChange={(e) => {
          presenter.handleChangeValues("address3", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.address3 || ""}
        focused={presenter.vm?.newClientObject?.address3 ? true : false}
      />
      <TextField
        label="City"
        onChange={(e) => {
          presenter.handleChangeValues("city", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.city || ""}
        focused={presenter.vm?.newClientObject?.city ? true : false}
      />
      <TextField
        label="Post Code"
        onChange={(e) => {
          presenter.handleChangeValues("post_code", e?.target?.value);
        }}
        value={presenter.vm?.newClientObject?.post_code || ""}
        focused={presenter.vm?.newClientObject?.post_code ? true : false}
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
        label="Client Firm Initials"
        onChange={(e) => {
            presenter.handleChangeValues("initials", e?.target?.value);
        }}
        value={
          presenter.vm?.newClientObject?.initials || ""
        }
        focused={
          presenter.vm?.newClientObject?.initials
            ? true
            : false
        }
      />
    </div>
  );
};

export default observer(AddClientForm);
