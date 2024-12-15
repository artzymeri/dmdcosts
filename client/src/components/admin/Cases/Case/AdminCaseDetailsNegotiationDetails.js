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
              <AdminCaseDetailsOfferItem presenter={presenter} offer={offer} />
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
              ? "You have not yet sent an offer, click to create the first one!"
              : "The case must reach at least the checked status first to make an offer"}
          </span>
          {presenter?.eligbleToCreateOffer && (
            <Button
              onClick={() => {
                presenter.setAddOfferModal(true, "sent");
              }}
              variant="contained"
              sx={{ background: "lightgray", color: "black" }}
            >
              Create First Offer
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCaseDetailsNegotiationDetails;
