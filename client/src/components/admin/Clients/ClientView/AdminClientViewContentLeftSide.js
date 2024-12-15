import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

const AdminClientViewContentLeftSide = (props) => {
  const { presenter } = props;
  return (
    <div className="admin-client-view-content-left-side">
      <div className="admin-client-view-content-left-side-row">
        <span className="admin-client-view-content-left-side-row-label">
          Firm Name:
        </span>
        {presenter?.editForm ? (
          <TextField
            size="small"
            sx={{ width: "250px" }}
            variant="standard"
            value={presenter?.editableClientDetails?.business_name}
            placeholder="Firm Name"
            onChange={(e) => {
              presenter.changeEditableClientDetails(
                "business_name",
                e?.target?.value
              );
            }}
          />
        ) : (
          <span className="admin-client-view-content-left-side-row-value">
            {presenter?.clientDetails?.business_name}
          </span>
        )}
      </div>
      <div className="admin-client-view-content-left-side-row">
        <span className="admin-client-view-content-left-side-row-label">
          Address:
        </span>
        {presenter?.editForm ? (
          <TextField
            size="small"
            sx={{ width: "250px" }}
            variant="standard"
            value={presenter?.editableClientDetails?.address}
            placeholder="Address"
            onChange={(e) => {
              presenter.changeEditableClientDetails(
                "address",
                e?.target?.value
              );
            }}
          />
        ) : (
          <span className="admin-client-view-content-left-side-row-value">
            {presenter?.clientDetails?.address}
          </span>
        )}
      </div>
      <div className="admin-client-view-content-left-side-row">
        <span className="admin-client-view-content-left-side-row-label">
          Email Address:
        </span>
        {presenter?.editForm ? (
          <TextField
            size="small"
            sx={{ width: "250px" }}
            variant="standard"
            value={presenter?.editableClientDetails?.email_address}
            placeholder="Email Address"
            onChange={(e) => {
              presenter.changeEditableClientDetails(
                "email_address",
                e?.target?.value
              );
            }}
          />
        ) : (
          <span className="admin-client-view-content-left-side-row-value">
            {presenter?.clientDetails?.email_address}
          </span>
        )}
      </div>
      <div className="admin-client-view-content-left-side-row">
        <span className="admin-client-view-content-left-side-row-label">
          Initials:
        </span>
        {presenter?.editForm ? (
          <TextField
            size="small"
            sx={{ width: "250px" }}
            variant="standard"
            value={presenter?.editableClientDetails?.initials}
            placeholder="Initials"
            onChange={(e) => {
              presenter.changeEditableClientDetails(
                "initials",
                e?.target?.value
              );
            }}
          />
        ) : (
          <span className="admin-client-view-content-left-side-row-value">
            {presenter?.clientDetails?.initials}
          </span>
        )}
      </div>
      {presenter?.editForm ? (
        <div className="admin-client-view-content-left-side-edit-form-buttons">
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            onClick={() => {
              presenter.switchEditForm(false);
            }}
          >
            Cancel Editing
          </Button>
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            onClick={() => {
              presenter.saveEditedClientDetails();
            }}
          >
            Save Editing
          </Button>
        </div>
      ) : (
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            presenter.switchEditForm(true);
          }}
        >
          Edit Details
        </Button>
      )}
    </div>
  );
};

export default observer(AdminClientViewContentLeftSide);
