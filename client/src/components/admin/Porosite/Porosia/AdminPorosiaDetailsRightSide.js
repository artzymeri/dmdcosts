import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import AdminPorosiaStatusBanner from "@/components/admin/Porosite/Porosia/AdminPorosiaStatusBanner";
import axios from "axios";

const AdminPorosiaDetailsRightSide = ({presenter}) => {

    const generatePDF = async (order) => {
            const dateObject = new Date(order?.createdAt);
            const formattedDate = dateObject.toLocaleString();
            try {
                const response = await axios.post(
                    `http://localhost:8080/generatepdfonly/${order?.id}`,
                    { order },
                    { responseType: "blob" }
                );

                const downloadLink = document.createElement("a");
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);

                downloadLink.href = url;
                downloadLink.setAttribute(
                    "download",
                    `Fatura ${order?.id} ${formattedDate}.pdf`
                );
                downloadLink.click();
            } catch (error) {
                console.error(error);
            }
    };

    return (
            <div className="admin-porosia-details-right-side">
                <div className="admin-porosia-details-status-container">
                    <span style={{fontWeight: "bold"}}>Statusi i porosisë:</span>
                    <AdminPorosiaStatusBanner progress={presenter.orderDetails?.progress}/>
                </div>
                <div className="admin-porosia-details-right-side-qr-code-container">
                    <div className="admin-porosia-details-right-side-qr-code-container-description">
                                        <span
                                            className="admin-porosia-details-right-side-qr-code-container-description-title">Skano QR-Code</span>
                        <p>Përmes telefonit tuaj smartphone, mund të skanoni këtë <b>QR-CODE</b> çdo herë
                            për të shikuar detajet dhe progresin e porosisë tuaj!</p>
                    </div>
                    <img src={presenter.orderDetails?.qr_code} height="200px"/>
                </div>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center', width: '100%'}}>
                    <Button variant="outlined" color="error" disabled={presenter.orderDetails?.progress !== 'request'}
                            fullWidth onClick={() => {
                        presenter.cancelOrder(presenter?.orderDetails?.id)
                    }}>
                        Anulo Porosinë
                    </Button>
                    <Button variant="contained" color="success" fullWidth onClick={() => {
                        generatePDF(presenter?.orderDetails)
                    }}>
                        Printo Porosinë
                    </Button>
                </div>
                <div className="admin-porosia-details-right-side-employees-involved">
                    <h2 style={{textAlign: 'center', textDecoration: 'underline'}}>Të përfshirë në porosi:</h2>
                    <div className="admin-porosia-details-right-side-employee-row" style={{marginTop: '20px'}}>
                        <span style={{fontWeight: 'bold'}}>Mbledhësi i Porosisë:</span>
                        <span
                            style={{fontStyle: !presenter?.orderDetails?.collector && 'italic'}}>{presenter.orderDetails.collector || 'Nuk ka të dhëna!'}</span>
                    </div>
                    <div className="admin-porosia-details-right-side-employee-row">
                        <span style={{fontWeight: 'bold'}}>Shoferi i Porosisë:</span>
                        <span
                            style={{fontStyle: !presenter?.orderDetails?.driver && 'italic'}}>{presenter.orderDetails.driver || 'Nuk ka të dhëna!'}</span>
                    </div>
                </div>
            </div>
    )
}

export default observer(AdminPorosiaDetailsRightSide);