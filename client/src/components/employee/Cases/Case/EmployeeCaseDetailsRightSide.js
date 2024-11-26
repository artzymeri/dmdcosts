import UserCaseStatusBanner from "@/components/employee/Cases/Case/EmployeeCaseStatusBanner";
import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";

const EmployeeCaseDetailsRightSide = ({presenter}) => {

    return (
        <div className="employee-case-details-right-side">
            <div className="employee-case-details-status-container">
                <span style={{fontWeight: "bold"}}>Statusi i porosisë:</span>
                <UserCaseStatusBanner progress={presenter.orderDetails?.progress}/>
            </div>
            <div className="employee-case-details-right-side-qr-code-container">
                <div className="employee-case-details-right-side-qr-code-container-description">
                                        <span
                                            className="employee-case-details-right-side-qr-code-container-description-title">Skano QR-Code</span>
                    <p>Përmes telefonit tuaj smartphone, mund të skanoni këtë <b>QR-CODE</b> çdo herë
                        për të shikuar detajet dhe progresin e porosisë tuaj!</p>
                </div>
                <img src={presenter.orderDetails?.qr_code} height="200px"/>
            </div>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center', width: '100%'}}>
                <Button variant="outlined" color="error" disabled={presenter.orderDetails?.progress !== 'request'} fullWidth onClick={() => {presenter.cancelOrder(presenter?.orderDetails?.id)}}>
                    Anulo Porosinë
                </Button>
                <Button variant="contained" color="success" fullWidth>
                    Printo Porosinë
                </Button>
            </div>
        </div>

    )
}

export default observer(EmployeeCaseDetailsRightSide);