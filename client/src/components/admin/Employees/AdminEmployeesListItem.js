import {observer} from "mobx-react-lite";
import {Checkbox, IconButton, Tooltip} from "@mui/material";
import {DeleteOutlineRounded} from "@mui/icons-material";

const AdminEmployeesListItem = (props) => {

    const {item, presenter} = props;

    return (<div>
        <div className="admin-employees-list-item">
            <Checkbox onChange={() => {
                presenter.selectEmployeeToDelete(item?.id)
            }}/>
            <Tooltip placement="top-start" title={item?.name_surname} arrow>
                <span>
                        {item?.name_surname}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.business_name} arrow>

                <span>
                        {item?.business_name}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.location} arrow>
                <span>
                        {item?.location}
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
            <Tooltip placement="top" title="Kliko për të fshirë llogarinë" arrow>
                <IconButton color="error" onClick={() => {
                    presenter.setDeletionModal(true)
                }}>
                    <DeleteOutlineRounded/>
                </IconButton>
            </Tooltip>
        </div>
    </div>)
}

export default observer(AdminEmployeesListItem);