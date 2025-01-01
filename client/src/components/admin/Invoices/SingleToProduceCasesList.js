import { Checkbox } from "@mui/material";
import { observer } from "mobx-react-lite";

const SingleToProduceCasesList = ({ presenter }) => {
  return presenter.singleToProduceCases &&
    presenter.singleToProduceCases.length > 0 ? (
    <>
      {presenter.singleToProduceCases.map((item) => {
        return (
          <div key={item.id}>
            <Checkbox
              onClick={(e) => {
                e.stopPropagation();
                presenter.selectCase(item?.id);
              }}
            />
            {item.id}
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
