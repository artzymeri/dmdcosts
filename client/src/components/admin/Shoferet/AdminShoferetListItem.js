import {observer} from "mobx-react-lite";
import {Checkbox, IconButton, Tooltip} from "@mui/material";
import {DeleteOutlineRounded} from "@mui/icons-material";

const AdminShoferetListItem = (props) => {

    const {item, presenter} = props;

    return (<div>
        <div className="admin-shoferet-list-item">
            <Checkbox onChange={() => {
                presenter.selectUserToDelete(item?.id)
            }}/>
            <Tooltip placement="top-start" title={item?.name_surname} arrow>
                <span>
                        {item?.name_surname}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.location_of_operation} arrow>

                <span>
                        {item?.location_of_operation}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.phone_number} arrow>
                <span>
                        {item?.phone_number}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.email_address} arrow>
                <span>
                        {item?.email_address}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.transport} arrow>
                <span>
                        {item?.transport}
                </span>
            </Tooltip>
            <Tooltip placement="top" title="Kliko për të fshirë llogarinë" arrow>
                <IconButton color="error" onClick={() => {
                    presenter.setDeletionModal(true, item?.id)
                }}>
                    <DeleteOutlineRounded/>
                </IconButton>
            </Tooltip>
        </div>
    </div>)
}

export default observer(AdminShoferetListItem);