import {NotificationsRounded} from "@mui/icons-material";
import {Fade, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {observer} from "mobx-react-lite";

const UserHeaderNotificationsMenu = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <NotificationsRounded
                id="basic-button"
                aria-controls={open ? 'notifications-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="notifications-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem className="admin-header-menu-item" onClick={handleClose}>Profile</MenuItem>
                <MenuItem className="admin-header-menu-item" onClick={handleClose}>My account</MenuItem>
                <MenuItem className="admin-header-menu-item" onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default observer(UserHeaderNotificationsMenu);