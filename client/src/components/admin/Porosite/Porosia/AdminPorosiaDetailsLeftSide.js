import dayjs from "dayjs";
import {observer} from "mobx-react-lite";

const AdminPorosiaDetailsLeftSide = ({presenter}) => {
    const details = [
        {label: "Emri dhe Mbiemri i Dërguesit:", value: presenter.orderDetails?.sender_name_surname},
        {label: "Emri Biznesit të Dërguesit:", value: presenter.orderDetails?.sender_business_name},
        {label: "Numri Telefonit të Dërguesit:", value: presenter.orderDetails?.sender_phone_number},
        {label: "Email Llogaria e Dërguesit:", value: presenter.orderDetails?.sender_email_address},
        {label: "Numri Telefonit i Pranuesit:", value: presenter.orderDetails?.receiver_phone_number},
        {
            label: presenter.orderDetails?.receiver_phone_number_2
                ? "Numri Telefonit Sekondar i Pranuesit:"
                : "Numri Telefonit Sekondar: Nuk ka të dhëna!",
            value: presenter.orderDetails?.receiver_phone_number_2 || "",
            className: !presenter.orderDetails?.receiver_phone_number_2 && "admin-porosia-details-left-side-info-no-info",
        },
        {
            label: "Qyteti/Shteti i Pranuesit:",
            value: `${presenter.orderDetails?.receiver_city}, ${presenter.orderDetails?.receiver_state}`,
        },
        {label: "Adresa e plotë e Pranuesit:", value: presenter.orderDetails?.receiver_full_address},
        {label: "Çmimi i produktit:", value: `${presenter.orderDetails?.product_price}€`},
        {label: "Përshkrimi i produktit:", value: presenter.orderDetails?.product_description},
        {
            label: presenter.orderDetails?.comment ? "Komenti:" : "Komenti: Nuk ka të dhëna!",
            value: presenter.orderDetails?.comment || "",
            className: !presenter.orderDetails?.comment && "admin-porosia-details-left-side-info-no-info",
        },
        {
            label: "Data e kërkesës:",
            value: dayjs(presenter.orderDetails?.createdAt).format("MM:HH, DD/MM/YYYY"),
        },
    ];

    return (
        <div className="admin-porosia-details-left-side">
            <span className="admin-porosia-details-left-side-title">Detajet e Porosisë:</span>
            {details.map(({label, value, className = ""}, index) => (
                <div
                    key={index}
                    className={`admin-porosia-details-left-side-row ${className}`}
                    style={index === 0 ? {marginTop: "20px"} : undefined}
                >
                    <span className="admin-porosia-details-left-side-label">{label}</span>
                    <span className="admin-porosia-details-left-side-info">{value}</span>
                </div>
            ))}
        </div>
    );
};

export default observer(AdminPorosiaDetailsLeftSide);
