import {Close, MovingRounded} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {observer} from "mobx-react-lite";

const AdminCaseStatusBanner = (props) => {
    const {progress} = props;

    const checkProgressText = (progress_type) => {
        if (progress_type == 'request') {
            return "Kërkesë";
        }
        if (progress_type == 'cancelled') {
            return "Anuluar";
        }
    }

    const checkProgressIcon = (progress_type) => {
        if (progress_type == 'request') {
            return <MovingRounded/>
        }
        if (progress_type == 'cancelled') {
            return <Close/>
        }
    }

    const checkProgressClass = (progress_type) => {
        if (progress_type == 'request') {
            return 'user-case-status-banner user-case-status-banner-request'
        }
        if (progress_type == 'cancelled') {
            return 'user-case-status-banner user-case-status-banner-cancelled'
        }
    }

    const checkProgressContent = (progress_type) => {
        if (progress_type == 'request') {
            return "Case është në pritje për tu mbledhur!"
        }
        if (progress_type == 'cancelled') {
            return "Case është anuluar!"
        }
    }

    return (
        <Tooltip title={checkProgressContent(progress)} arrow>
            <div className={checkProgressClass(progress)}>
                {checkProgressIcon(progress)}
                <span>
                {checkProgressText(progress)}
            </span>
            </div>
        </Tooltip>
    )
}

export default observer(AdminCaseStatusBanner);