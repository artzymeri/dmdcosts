import { Checkbox } from "@mui/material";
import { observer } from "mobx-react-lite";

const SingleToProduceCasesList = ({ presenter }) => {
  return presenter.singleToProduceCases &&
    presenter.singleToProduceCases.length > 0 ? (
    <>
      {presenter.singleToProduceCases.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Checkbox
                onClick={(e) => {
                  e.stopPropagation();
                  presenter.selectCase(item?.id);
                }}
              />
              <span>{`#${presenter.getClientDetailsByCase(item).initials}.${
                item.type
              }.${item.id}`}</span>
            </div>
            <span>{presenter.getClientDetailsByCase(item).business_name}</span>
          </div>
        );
      })}
    </>
  ) : (
    <div style={{ width: "100%", textAlign: "center" }}>
      No Cases to Produce.
    </div>
  );
};

export default observer(SingleToProduceCasesList);
