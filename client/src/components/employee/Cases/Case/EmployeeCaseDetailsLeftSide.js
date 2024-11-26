import dayjs from "dayjs";
import {observer} from "mobx-react-lite";

const EmployeeCaseDetailsLeftSide = ({presenter}) => {
    return (
        <div className="employee-case-details-left-side">
            <span className="employee-case-details-left-side-title">Detajet e Porosisë:</span>
            <div className="employee-case-details-left-side-row" style={{marginTop: '20px'}}>
                                        <span className="employee-case-details-left-side-label">
                                            Emri dhe Mbiemri:
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {presenter.orderDetails?.receiver_name_surname}
                                        </span>
            </div>
            <div className="employee-case-details-left-side-row">
                                        <span className="employee-case-details-left-side-label">
                                            Numri Telefonit:
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {presenter.orderDetails?.receiver_phone_number}
                                        </span>
            </div>
            <div
                className={`employee-case-details-left-side-row ${!presenter.orderDetails?.receiver_phone_number_2 && 'employee-case-details-left-side-info-no-info'}`}>
                                        <span className="employee-case-details-left-side-label">
                                            {presenter.orderDetails?.receiver_phone_number_2 ? 'Numri Telefonit Sekondar:' : 'Numri Telefonit Sekondar: Nuk ka të dhëna!'}
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {presenter.orderDetails?.receiver_phone_number_2}
                                        </span>
            </div>
            <div className="employee-case-details-left-side-row">
                                        <span className="employee-case-details-left-side-label">
                                            Qyteti/Shteti:
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {`${presenter.orderDetails?.receiver_city}, ${presenter.orderDetails?.receiver_state}`}
                                        </span>
            </div>
            <div className="employee-case-details-left-side-row">
                                        <span className="employee-case-details-left-side-label">
                                            Adresa e plotë:
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {presenter.orderDetails?.receiver_full_address}
                                        </span>
            </div>
            <div className="employee-case-details-left-side-row">
                                        <span className="employee-case-details-left-side-label">
                                            Çmimi i produktit:
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {`${presenter.orderDetails?.product_price}€`}
                                        </span>
            </div>
            <div className="employee-case-details-left-side-row">
                                        <span className="employee-case-details-left-side-label">
                                            Përshkrimi i produktit:
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {presenter.orderDetails?.product_description}
                                        </span>
            </div>
            <div
                className={`employee-case-details-left-side-row ${!presenter.orderDetails?.comment && 'employee-case-details-left-side-info-no-info'}`}>
                                        <span style={{alignSelf: 'flex-start'}}
                                              className="employee-case-details-left-side-label">
                                            {presenter.orderDetails?.comment ? 'Komenti:' : 'Komenti: Nuk ka të dhëna!'}
                                        </span>
                <span className="employee-case-details-left-side-info">
                                            {presenter.orderDetails?.comment}
                                        </span>
            </div>
            <div className="employee-case-details-left-side-row">
                                        <span className="employee-case-details-left-side-label">
                                            Data e kërkesës:
                                        </span>
                <span className="employee-case-details-left-side-info">
                    {dayjs(presenter.orderDetails?.createdAt).format('MM:HH, DD/MM/YYYY')}
                </span>
            </div>
        </div>

    )
}

export default observer(EmployeeCaseDetailsLeftSide)