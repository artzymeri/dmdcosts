import {Button, FormControl, NativeSelect, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";
import {DeleteOutlineRounded} from "@mui/icons-material";

const AdminEmployeesHeader = ({presenter}) => {


    return (
        <div className="admin-employees-header-container">
            <TextField
                placeholder="Kërko"
                id="filled-hidden-label-small"
                variant="standard"
                size="small"
                fullWidth
                autoComplete={"off"}
                onChange={(e) => {
                    presenter.handleSearchFiltering(e)
                }}
            />
            <FormControl sx={{width: '150px'}} variant="filled">
                <NativeSelect
                    variant="filled"
                    defaultValue={'name_surname'}
                    onChange={(e) => {
                        presenter.handleSortingOptions(e)
                    }}
                >
                    <option value={'name_surname'}>Emri</option>
                    <option value={'business_name'}>Biznesi</option>
                    <option value={'location'}>Adresa</option>
                    <option value={'phone_number'}>Nr. Telefonit</option>
                    <option value={'email_address'}>Email Llogaria</option>
                </NativeSelect>
            </FormControl>
            <FormControl sx={{width: '150px'}} variant="filled">
                <NativeSelect
                    variant="filled"
                    defaultValue={'a-z'}
                    onChange={(e) => {
                        presenter.handleSortingMode(e)
                    }}
                >
                    <option value={'a-z'}>A-Z</option>
                    <option value={'z-a'}>Z-A</option>
                </NativeSelect>
            </FormControl>
            <Button variant="contained" color="error" onClick={() => {
                presenter.setDeletionModal(true)
            }} disabled={presenter?.bulkDeletionButtonDisabled}>
                <DeleteOutlineRounded/>
            </Button>
        </div>
    )
}

export default observer(AdminEmployeesHeader);