import dayjs from "dayjs";
import {observer} from "mobx-react-lite";

const AdminCaseDetailsLeftSide = ({presenter}) => {
    const details = [
        {label: "Emri dhe Mbiemri i Dërguesit:", value: presenter.caseDetails?.sender_name_surname},
        {label: "Emri Biznesit të Dërguesit:", value: presenter.caseDetails?.sender_business_name},
        {label: "Numri Telefonit të Dërguesit:", value: presenter.caseDetails?.sender_phone_number},
        {label: "Email Llogaria e Dërguesit:", value: presenter.caseDetails?.sender_email_address},
        {label: "Numri Telefonit i Pranuesit:", value: presenter.caseDetails?.receiver_phone_number},
        {
            label: presenter.caseDetails?.receiver_phone_number_2
                ? "Numri Telefonit Sekondar i Pranuesit:"
                : "Numri Telefonit Sekondar: Nuk ka të dhëna!",
            value: presenter.caseDetails?.receiver_phone_number_2 || "",
            className: !presenter.caseDetails?.receiver_phone_number_2 && "admin-case-details-left-side-info-no-info",
        },
        {
            label: "Qyteti/Shteti i Pranuesit:",
            value: `${presenter.caseDetails?.receiver_city}, ${presenter.caseDetails?.receiver_state}`,
        },
        {label: "Adresa e plotë e Pranuesit:", value: presenter.caseDetails?.receiver_full_address},
        {label: "Çmimi i produktit:", value: `${presenter.caseDetails?.product_price}€`},
        {label: "Përshkrimi i produktit:", value: presenter.caseDetails?.product_description},
        {
            label: presenter.caseDetails?.comment ? "Komenti:" : "Komenti: Nuk ka të dhëna!",
            value: presenter.caseDetails?.comment || "",
            className: !presenter.caseDetails?.comment && "admin-case-details-left-side-info-no-info",
        },
        {
            label: "Date of creation:",
            value: dayjs(presenter.caseDetails?.createdAt).format("MM:HH, DD/MM/YYYY"),
        },
    ];

    return (
        <div className="admin-case-details-left-side">
            <span className="admin-case-details-left-side-title">Case Details:</span>
            {details.map(({label, value, className = ""}, index) => (
                <div
                    key={index}
                    className={`admin-case-details-left-side-row ${className}`}
                    style={index === 0 ? {marginTop: "20px"} : undefined}
                >
                    <span className="admin-case-details-left-side-label">{label}</span>
                    <span className="admin-case-details-left-side-info">{value}</span>
                </div>
            ))}
        </div>
    );
};

export default observer(AdminCaseDetailsLeftSide);
