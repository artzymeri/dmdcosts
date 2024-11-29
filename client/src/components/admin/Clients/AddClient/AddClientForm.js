import { observer } from "mobx-react-lite";

const { TextField } = require("@mui/material");

const AddClientForm = (props) => {
  const { presenter } = props;

  return (
    <div className="admin-add-client-form-container">
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </div>
  );
};

export default observer(AddClientForm);
