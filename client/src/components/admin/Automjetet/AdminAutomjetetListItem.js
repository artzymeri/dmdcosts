import {observer} from "mobx-react-lite";
import {Checkbox, IconButton, Tooltip} from "@mui/material";
import {DeleteOutlineRounded} from "@mui/icons-material";

const AdminAutomjetetListItem = (props) => {

    const {transport, presenter} = props;

    return (
        <div>
            <div className="admin-automjetet-list-item">
                <Checkbox onChange={() => {
                    presenter.selectAutomjetToDelete(transport?.id)
                }}/>
                <Tooltip placement="top-start" title={transport?.model} arrow>
                <span>
                        {transport?.model ? transport?.model : 'Nuk ka të dhëna'}
                </span>
                </Tooltip>
                <Tooltip placement="top-start" title={transport?.tag} arrow>

                <span>
                        {transport?.tag ? transport?.tag : 'Nuk ka të dhëna'}
                </span>
                </Tooltip>
                <Tooltip placement="top-start" title={transport?.expiry_date} arrow>
                <span>
                        {transport?.expiry_date ? transport?.expiry_date : 'Nuk ka të dhëna'}
                </span>
                </Tooltip>
                <Tooltip placement="top-start" title={transport?.assignee} arrow>
                <span>
                        {transport?.assignee ? transport?.assignee : 'Nuk ka të dhëna'}
                </span>
                </Tooltip>
                <Tooltip placement="top-start" title={transport?.document ? 'Dokumenti i ngarkuar' : 'Nuk është ngarkuar dokument'} arrow>
                <span>
                        {transport?.document ? 'Ka dokument' : 'Nuk ka dokument'}
                </span>
                </Tooltip>
                <Tooltip placement="top" title="Kliko për të fshirë llogarinë" arrow>
                    <IconButton color="error" onClick={() => {
                        presenter.setDeletionModal(true, transport?.id)
                    }}>
                        <DeleteOutlineRounded/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default observer(AdminAutomjetetListItem);