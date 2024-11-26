import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const AdminSecondHeader = ({presenter}) => {

    return (
        <div className="admin-porosite-header-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width: '100%'}} value={presenter.vm?.firstDateFilter} slotProps={{
                    field: {
                        clearable: true, onClear: () => {
                            presenter.handleDatesChange(null, 'firstDateFilter')
                        }
                    },
                }} label="Data fillestare" format={'DD/MM/YYYY'} onChange={(newValue) => {
                    presenter.handleDatesChange(newValue, 'firstDateFilter')
                }}/>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width: '100%'}} value={presenter.vm?.lastDateFilter} slotProps={{
                    field: {
                        clearable: true, onClear: () => {
                            presenter.handleDatesChange(null, 'lastDateFilter')
                        }
                    },
                }} label="Data mbyllëse" format={'DD/MM/YYYY'} onChange={(newValue) => {
                    presenter.handleDatesChange(newValue, 'lastDateFilter')
                }}/>
            </LocalizationProvider>
            <Button variant="contained" size="large" color="success" disabled={presenter?.printInvoicesButtonDisabled} sx={{textWrap: 'nowrap', flexShrink: '0'}}>
                Printo Faturat
            </Button>
        </div>
    )
}

export default observer(AdminSecondHeader);