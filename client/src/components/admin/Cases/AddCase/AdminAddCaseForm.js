import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {observer} from "mobx-react-lite";
import {FormControlLabel, Switch, ToggleButton} from "@mui/material";

const {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} = require("@mui/material");

const AdminAddCaseForm = (props) => {
    const {presenter} = props;

    return (
        <div className="admin-add-client-form-container">
            <FormControl>
                <InputLabel
                    sx={{padding: "0px 5px", background: "white"}}
                    id="client-select"
                >
                    Clients
                </InputLabel>
                <Select
                    labelId="client-select"
                    variant="outlined"
                    value={presenter?.vm?.newCaseObject?.client_id || ""}
                    onChange={presenter.handleClientChange}
                    focused={
                        presenter?.vm?.newCaseObject?.client_id
                            ? true.toString()
                            : false.toString()
                    }
                >
                    {presenter?.clientsList &&
                        presenter?.clientsList.map((client) => {
                            return (
                                <MenuItem key={client?.id} value={client?.id}>
                                    {client?.business_name}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel
                    sx={{padding: "0px 5px", background: "white"}}
                    id="employee-select"
                >
                    Assignee
                </InputLabel>
                <Select
                    labelId="employee-select"
                    variant="outlined"
                    value={presenter?.vm?.newCaseObject?.assignee_id || ""}
                    onChange={presenter.handleAssigneeChange}
                    focused={
                        presenter?.vm?.newCaseObject?.assignee_id
                            ? true.toString()
                            : false.toString()
                    }
                >
                    {presenter?.employeesList &&
                        presenter?.employeesList.map((employee) => {
                            return (
                                <MenuItem key={employee?.id} value={employee?.id}>
                                    {employee?.name_surname}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel
                    sx={{padding: "0px 5px", background: "white"}}
                    id="type-select"
                >
                    Type Of Case
                </InputLabel>
                <Select
                    labelId="type-select"
                    variant="outlined"
                    value={presenter?.vm?.newCaseObject?.type || ""}
                    onChange={presenter.handleCaseTypeChange}
                    focused={
                        presenter?.vm?.newCaseObject?.type
                            ? true.toString()
                            : false.toString()
                    }
                >
                    <MenuItem value={'MOD'}>
                        MOD
                    </MenuItem>
                    <MenuItem value={'ID'}>
                        ID
                    </MenuItem>
                    <MenuItem value={'HDR'}>
                        HDR
                    </MenuItem>
                    <MenuItem value={'PI'}>
                        PI
                    </MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Claimant Name"
                onChange={(e) => {
                    presenter.handleChangeValues("claimant_name", e?.target?.value);
                }}
                value={presenter.vm?.newCaseObject?.claimant_name || ""}
                focused={presenter.vm?.newCaseObject?.claimant_name ? true : false}
            />
            <TextField
                label="Client Reference Number"
                onChange={(e) => {
                    presenter.handleChangeValues("client_reference_number", e?.target?.value);
                }}
                value={presenter.vm?.newCaseObject?.client_reference_number || ""}
                focused={presenter.vm?.newCaseObject?.client_reference_number ? true : false}
            />
            <TextField
                label="Defendant Name"
                onChange={(e) => {
                    presenter.handleChangeValues("defendant_name", e?.target?.value);
                }}
                value={presenter.vm?.newCaseObject?.defendant_name || ""}
                focused={presenter.vm?.newCaseObject?.defendant_name ? true : false}
            />
            <TextField
                label="Defendant Reference Number"
                onChange={(e) => {
                    presenter.handleChangeValues("defendant_reference_number", e?.target?.value);
                }}
                value={presenter.vm?.newCaseObject?.defendant_reference_number || ""}
                focused={presenter.vm?.newCaseObject?.defendant_reference_number ? true : false}
            />
            <TextField
                label="Defendant Email"
                onChange={(e) => {
                    presenter.handleChangeValues("defendant_email", e?.target?.value);
                }}
                value={presenter.vm?.newCaseObject?.defendant_email || ""}
                focused={presenter.vm?.newCaseObject?.defendant_email ? true : false}
            />
            <TextField
                label="Rate Per Hour"
                onChange={(e) => {
                    presenter.handleChangeValues("rate_per_hour", e?.target?.value);
                }}
                value={presenter.vm?.newCaseObject?.rate_per_hour || ""}
                focused={presenter.vm?.newCaseObject?.rate_per_hour ? true : false}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{width: "100%"}}
                    value={presenter.vm?.newCaseObject?.date_instructed}
                    slotProps={{
                        field: {
                            clearable: true,
                            onClear: () => {
                                presenter.handleDateChange(null);
                            },
                        },
                    }}
                    label="Date Instructed"
                    format={"DD/MM/YYYY"}
                    onChange={(newValue) => {
                        presenter.handleDateChange(newValue);
                    }}
                />
            </LocalizationProvider>
            <FormControlLabel control={<Switch checked={presenter.vm?.newCaseObject?.negotiable} onChange={presenter.handleNegotiableChange}/>} label="Negotiable"/>
        </div>
    );
};

export default observer(AdminAddCaseForm);
