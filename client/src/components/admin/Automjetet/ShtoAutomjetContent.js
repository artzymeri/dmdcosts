import {Button, TextField, Tooltip} from "@mui/material";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import {ArrowBack, CloseRounded, CloudUploadRounded} from "@mui/icons-material";
import {useRouter} from "next/router";
import {styled} from '@mui/material/styles';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useState} from "react";

const ShtoAutomjetContent = () => {
    const [presenter, setPresenter] = useState(container.get(TYPES.AdminShtoAutomjetPresenter));

    const router = useRouter();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className="shto-automjet-page-container">
            <div style={{display: 'flex', gap: '15px', flexDirection: 'column'}}>
                <h2>Shto Automjet</h2>
                <Button className="kthehu-button" style={{alignSelf: 'start'}} variant="outlined"
                        startIcon={<ArrowBack/>} onClick={() => {
                    router.push('/automjetet');
                }}>
                    Automjetet
                </Button>
            </div>
            <div className="shto-automjet-page-content">
                <div className="shto-automjet-page-form-container">
                    <TextField variant="filled" className="shto-automjet-text-field" hiddenLabel placeholder="Modeli"
                               onChange={(e) => presenter.changeValues(e, 'model')}/>
                    <TextField variant="filled" className="shto-automjet-text-field" hiddenLabel placeholder="Tabelat"
                               onChange={(e) => presenter.changeValues(e, 'tag')}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="date-picker-filled" sx={{width: '100%', border: 'none'}}
                                    value={presenter.vm?.expiry_date} slotProps={{
                            field: {
                                clearable: true, onClear: () => {
                                    presenter.handleDatesChange(null);
                                }
                            },
                        }} label="Data fillestare" format={'DD/MM/YYYY'} onChange={(newValue) => {
                            presenter.handleDatesChange(newValue);
                        }}/>
                    </LocalizationProvider>
                    <TextField variant="filled" className="shto-automjet-text-field" hiddenLabel placeholder="Shoferi"
                               onChange={(e) => presenter.changeValues(e, 'assignee')}/>
                    {
                        presenter.documentUploaded && (
                            <div className="shto-automjet-page-document-uploaded">
                                <span style={{fontWeight: 'bold'}}>DOKUMENTI U NGARKUA!</span>
                                <Tooltip title="Fshij dokumentin e ngarkuar" arrow>
                                    <CloseRounded sx={{cursor: 'pointer'}} onClick={() => {
                                        presenter.removeDocumentUpload();
                                    }}/>
                                </Tooltip>
                            </div>
                        )
                    }
                    <Button
                        style={{gridColumn: 'span 2'}}
                        component="label"
                        role={undefined}
                        variant="outlined"
                        color="success"
                        tabIndex={-1}
                        size="large"
                        startIcon={<CloudUploadRounded/>}
                    >
                        {
                            presenter.documentUploaded ? 'Ngarko një dokument tjetër' : 'Ngarko dokumentin e automjetit'
                        }
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => presenter.handleDocumentUpload(event)}
                            multiple
                        />
                    </Button>
                    <Button style={{gridColumn: 'span 2'}} size="large" variant="contained" onClick={() => {
                        presenter.addTransport();
                    }}>Shto Automjet</Button>
                </div>
            </div>
        </div>
    );
}

export default observer(ShtoAutomjetContent);
