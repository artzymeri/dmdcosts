import { observer } from "mobx-react-lite";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import dayjs from "dayjs";

const InvoicesListItem = (props) => {
    const { item, presenter } = props;

    return (
        <div
            className={`admin-cases-list-item`}
        >
            <Checkbox
                onClick={(e) => {
                    e.stopPropagation();
                    presenter.handleCaseCheck(item?.id);
                }}
            />
            <Tooltip placement="top-start" title={'aaa'} arrow>
                <span>{`aaa`}</span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.client_business_name} arrow>
                <span>{item?.client_business_name}</span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.assignee_name_surname} arrow>
                <span>{item?.assignee_name_surname}</span>
            </Tooltip>
            <Tooltip placement="top-start" title={'aaa'} arrow>
                <span>aaa</span>
            </Tooltip>
            <Tooltip
                placement="top-start"
                title={item?.negotiable ? "Negotiable" : "Non-Negotiable"}
                arrow
            >
                <span>{item?.negotiable ? "Negotiable" : "Non-Negotiable"}</span>
            </Tooltip>
            <Tooltip
                placement="top-start"
                title={dayjs(item?.createdAt).format('DD|MM|YYYY')}
                arrow
            >
                <span>{dayjs(item?.createdAt).format('DD|MM|YYYY')}</span>
            </Tooltip>
            <Tooltip placement="top" title="Click to delete case" arrow>
                <IconButton
                    color="error"
                    onClick={(e) => {
                        e.stopPropagation();
                        presenter.handleSingleDeletionCasesModal(item?.id, true);
                    }}
                >
                    <DeleteOutlineRounded />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default observer(InvoicesListItem);
