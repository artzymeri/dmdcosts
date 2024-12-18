import {NotificationsRounded, Warning} from "@mui/icons-material";
import {Alert, Badge, Fade, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const AdminHeaderNotificationsMenu = ({presenter}) => {

    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const customAlertMessage = (case_details) => {
        if (case_details.alert == 'pod-expiring') {
            return `Case ${case_details.client_initials}.${case_details.type}.${case_details.id} has awaiting POD to check`
        }
    }

    const redirectToCase = (case_id) => {
        router.push(`/case/${case_id}`)
    }

    return (
        <>
            <Badge badgeContent={presenter?.notificationsNumber} color="error">
                <NotificationsRounded
                    id="basic-button"
                    aria-controls={open ? 'notifications-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                />
                <Menu
                    className="admin-header-menu-container"
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
                    {
                        presenter.notificationsMenuList.length > 0 ?
                            presenter.notificationsMenuList.map((item) => {
                                return (
                                    <MenuItem key={item.id} className="admin-header-reminders-item"
                                              onClick={() => {
                                                  redirectToCase(item.id)
                                              }}>
                                        <Warning color="error"/>
                                        <span>
                                            {customAlertMessage(item)}
                                        </span>
                                    </MenuItem>
                                )
                            })
                            : <MenuItem className="admin-header-reminders-item" onClick={handleClose}>No Reminders</MenuItem>
                    }
                </Menu>
            </Badge>
        </>
    )
}

export default observer(AdminHeaderNotificationsMenu);