import { SettingsRounded } from "@mui/icons-material";
import { Fade, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { observer } from "mobx-react-lite";

const AdminHeaderSettingsMenu = ({ presenter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openSettingsPopup = () => {
    presenter.setSettingsPopup(true);
    handleClose();
  };

  return (
    <>
      <SettingsRounded
        id="basic-button"
        aria-controls={open ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          className="admin-header-settings-item"
          onClick={openSettingsPopup}
        >
          Settings
        </MenuItem>
      </Menu>
    </>
  );
};

export default observer(AdminHeaderSettingsMenu);
