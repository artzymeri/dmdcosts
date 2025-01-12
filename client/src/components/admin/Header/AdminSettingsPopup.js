import Cookies from "js-cookie";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} = require("@mui/material");

const AdminSettingsPopup = ({ presenter }) => {
  const router = useRouter();

  const changePasswordButtonClicked = () => {
    presenter.setSettingsPopup(false);
    presenter.setChangePasswordPopup(true);
  };
  return (
    <Dialog
      open={presenter.settingsPopup}
      onClose={() => {
        presenter.setSettingsPopup(false);
      }}
    >
      <DialogTitle borderBottom={"1px solid lightgray"}>
        Change User Details
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "10px !important",
          width: "500px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <TextField
            fullWidth
            value={presenter.vm?.editUserData?.name_surname}
            placeholder="Name Surname"
            onChange={(e) => {
              presenter.handleUserDataValuesChange(
                "name_surname",
                e.target.value
              );
            }}
          />
          <TextField
            fullWidth
            value={presenter.vm?.editUserData?.email_address}
            placeholder="Email Address"
            onChange={(e) => {
              presenter.handleUserDataValuesChange(
                "email_address",
                e.target.value
              );
            }}
          />
          <TextField
            fullWidth
            value={presenter.vm?.editUserData?.username}
            placeholder="Username"
            onChange={(e) => {
              presenter.handleUserDataValuesChange("username", e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              changePasswordButtonClicked();
            }}
          >
            Change Password
          </Button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            paddingTop: "30px",
            position: "relative",
          }}
        >
          <h4
            style={{
              position: "absolute",
              color: "gray",
              top: "5px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Bank Details
          </h4>
          <TextField
            fullWidth
            value={presenter.vm?.editUserData?.account_holder}
            placeholder="Account Holder"
            onChange={(e) => {
              presenter.handleUserDataValuesChange(
                "account_holder",
                e.target.value
              );
            }}
          />
          <TextField
            fullWidth
            value={presenter.vm?.editUserData?.account_number}
            placeholder="Account Number"
            onChange={(e) => {
              presenter.handleUserDataValuesChange(
                "account_number",
                e.target.value
              );
            }}
          />
          <TextField
            fullWidth
            value={presenter.vm?.editUserData?.sort_code}
            placeholder="Sort Code"
            onChange={(e) => {
              presenter.handleUserDataValuesChange("sort_code", e.target.value);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid lightgray",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            presenter.setSettingsPopup(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            presenter.saveEditUserDetails().then((res) => {
              if (res.data.title == "success") {
                Cookies.remove("adminToken");
                presenter.setSettingsPopup(false);
                router.push("/login");
              }
              if (res.data.title == "error") {
                presenter.setSnackbar(true, res.data);
              }
            });
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AdminSettingsPopup);
