import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import { observer } from "mobx-react-lite";

const BundleToProduceCasesList = ({ presenter }) => {
  return (
    <>
      {presenter.allClients.length > 0 && (
        <FormControl fullWidth>
          <InputLabel>Client</InputLabel>
          <Select
            value={presenter.vm.selected_client?.id || ""}
            onChange={(event) => {
              const selectedClient = presenter.allClients.find(
                (client) => client.id === event.target.value
              );
              presenter.setSelectedClient(selectedClient);
            }}
            label="Client"
          >
            {presenter.allClients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.business_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {presenter.bundleToProduceCases.length > 0 ? (
        presenter.bundleToProduceCases.map((item) => (
          <div key={item.id}>
            <Checkbox
              onClick={(e) => {
                e.stopPropagation();
                presenter.selectCase(item?.id);
              }}
            />
            {item.id}
          </div>
        ))
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          No Cases to Produce.
        </div>
      )}
    </>
  );
};

export default observer(BundleToProduceCasesList);
