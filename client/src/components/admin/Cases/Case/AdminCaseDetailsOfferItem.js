import { DeleteOutlineRounded } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const AdminCaseDetailsOfferItem = ({ presenter, offer }) => {
  return (
    <div className="admin-case-details-negotiation-offer" key={offer.id}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <span>
          Date: <b>{dayjs(offer.sent?.date).format("DD/MM/YYYY")}</b>
        </span>
        <span>
          Value: <b>{offer.sent?.value}</b>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {offer.received ? (
          <>
            <span>
              Date: <b>{dayjs(offer.received?.date).format("DD/MM/YYYY")}</b>
            </span>
            <span>
              Value: <b>{offer.received?.value}</b>
            </span>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{ height: "100%" }}
            onClick={() => {
              presenter.setAddOfferModal(true, "received", offer.id);
            }}
          >
            Add received offer
          </Button>
        )}
      </div>
      <Tooltip placement="top" title="Click to delete offer" arrow>
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            presenter.deleteOffer(offer?.id);
          }}
        >
          <DeleteOutlineRounded />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default observer(AdminCaseDetailsOfferItem);
