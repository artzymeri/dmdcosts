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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          width: "500px",
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
        <Button variant="contained" color="primary">
          Change Password
        </Button>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid lightgray",
        }}
      >
        <Button variant="outlined" color="error">
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
