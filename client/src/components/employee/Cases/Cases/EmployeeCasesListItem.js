import {observer} from "mobx-react-lite";
import {Button, Tooltip} from "@mui/material";
import {useRouter} from "next/router";

const EmployeeCasesListItem = (props) => {

    const {item, cancelOrder} = props;
    const router = useRouter();


    const progressCheck = (progress) => {
        if (progress === "request") {
            return 'Kërkesë'
        }
        if (progress === 'cancelled') {
            return 'Anuluar'
        }
    }

    const progressClassCheck = (progress) => {
        if (progress === null) {
            return;
        }
        if (progress === 'cancelled') {
            return 'employee-cases-list-item-progress-bar-cancelled';
        }
    }

    return (
        <div
            onClick={() => {
                router.push(`/case/${item?.id}`);
            }}
            className={`employee-cases-list-item ${item?.progress == 'cancelled' && 'employee-cases-list-item-cancelled'}`}>
            <Tooltip placement="top-start" title={item?.receiver_name_surname} arrow>
                <span>
                        {item?.receiver_name_surname}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.receiver_phone_number} arrow>
                <span>
                        {item?.receiver_phone_number}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.receiver_city} arrow>
                <span>
                        {item?.receiver_city}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.receiver_state} arrow>
                <span>
                        {item?.receiver_state}
                </span>
            </Tooltip>
            <Tooltip placement="top-start" title={item?.receiver_full_address} arrow>
                <span>
                        {item?.receiver_full_address}
                </span>
            </Tooltip>
            <div className="employee-cases-list-item-progress-bar-container">
                <span
                    className={`employee-cases-list-item-progress-bar ${progressClassCheck(item?.progress)}`}>{progressCheck(item?.progress)}</span>
            </div>
            {
                item?.progress == "request" &&
                <Tooltip placement="top" title="Kliko për të anuluar llogarinë" arrow>
                    <Button variant="outlined" color="error" disabled={!item?.progress == 'request'} onClick={(e) => {
                        e.stopPropagation();
                        cancelOrder(true, item?.id);
                    }}>
                        Anulo
                    </Button>
                </Tooltip>
            }
        </div>
    )
}

export default observer(EmployeeCasesListItem);