import { Button } from "@mui/material";
import dayjs from "dayjs";
import AdminCaseDetailsOfferItem from "./AdminCaseDetailsOfferItem";

const AdminCaseDetailsNegotiationDetails = ({ presenter }) => {
  return (
    <div className="admin-case-details-negotiation-details-container">
      <span className="admin-case-details-negotiation-details-title">
        Negotiation Details
      </span>
      {presenter.caseOffers.length > 0 && (
        <div className="admin-case-details-offers-list-container">
          {presenter.caseOffers.map((offer) => {
            return (
              <AdminCaseDetailsOfferItem key={offer.id} presenter={presenter} offer={offer} />
            );
          })}
          <Button
            variant="contained"
            size="large"
            color="success"
            fullWidth
            onClick={() => {
              presenter.setAddOfferModal(true, "sent");
            }}
          >
            Add New Offer
          </Button>
        </div>
      )}
      {presenter.caseOffers.length == 0 && (
        <div className="admin-case-details-negotiation-details-no-offers-container">
          <span>
            {presenter?.eligbleToCreateOffer
              ? "You have to serve the case in order to create the initial offer!"
              : "The case must reach at least the checked status first to make an offer"}
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminCaseDetailsNegotiationDetails;
