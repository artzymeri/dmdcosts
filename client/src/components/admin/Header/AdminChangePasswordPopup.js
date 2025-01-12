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

const AdminChangePasswordPopup = ({ presenter }) => {
  const router = useRouter();

  const closedChangedPasswordPopup = () => {
    presenter.setChangePasswordPopup(false);
    presenter.setSettingsPopup(true);
  };
  return (
    <Dialog
      open={presenter.changePasswordPopup}
      onClose={() => {
        closedChangedPasswordPopup();
      }}
    >
      <DialogTitle borderBottom={"1px solid lightgray"}>
        Change User Password
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
            type="password"
            value={presenter.vm?.change_password_values?.first_value}
            placeholder="Type new password"
            onChange={(e) => {
              presenter.handleChangePasswordValues(
                "first_value",
                e.target.value
              );
            }}
          />
          <TextField
            fullWidth
            type="password"
            value={presenter.vm?.change_password_values?.second_value}
            placeholder="Type password again"
            onChange={(e) => {
              presenter.handleChangePasswordValues(
                "second_value",
                e.target.value
              );
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
            closedChangedPasswordPopup();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            presenter.saveChangeUserPassword().then((res) => {
              if (res?.data?.title == "success") {
                Cookies.remove("adminToken");
                presenter.setChangePasswordPopup(false);
                router.push("/login");
              }
              if (res?.data?.title == "error") {
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

export default observer(AdminChangePasswordPopup);
