import {Button, FormControl, InputLabel, MenuItem, NativeSelect, TextField, Tooltip} from "@mui/material";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import {ArrowBack, CloseRounded, CloudUploadRounded} from "@mui/icons-material";
import {useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import {useEffect, useState} from "react";

const ShtoShoferContent = () => {

    const [presenter, setPresenter] = useState(container.get(TYPES.AdminShtoShoferPresenter))
    const router = useRouter();

    useEffect(() => {
        presenter.setLoadingState(true)
        presenter.getAllTransports().then(() => {presenter.setLoadingState(false)})
    }, []);

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
        <div className="shto-shofer-page-container">
            <div style={{display: 'flex', gap: '15px', flexDirection: 'column'}}>
                <h2>Shto Shofer</h2>
                <Button className="kthehu-button" style={{alignSelf: 'start'}} variant="outlined"
                        startIcon={<ArrowBack/>} onClick={() => {
                    router.push('/shoferet')
                }}>
                    Shoferët
                </Button>
            </div>
            <div className="shto-shofer-page-content">
                <div className="shto-shofer-page-form-container">
                    <TextField variant="filled" hiddenLabel placeholder="Emri dhe mbiemri"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'name_surname')
                               }}/>
                    <FormControl fullWidth variant="filled">
                        <NativeSelect
                            defaultValue={'Prishtina'}
                            placeholder="Qyteti i Operimit"
                            sx={{height: '100%', background: 'rgba(0, 0, 0, 0.06)', padding: '0px 0px 0px 10px'}}
                            variant="filled"
                            onChange={(e) => {presenter.changeValues(e, 'location_of_operation')}}
                            inputProps={{
                                name: 'location_of_operation',
                                id: 'location_of_operation_select',
                            }}
                        >
                            {
                                presenter.vm.cities_list.map((item) => {
                                    return (
                                        <option key={item?.id} value={item?.city}>{item?.city}</option>
                                    )
                                })
                            }
                        </NativeSelect>
                    </FormControl>
                    <TextField variant="filled" hiddenLabel placeholder="Numri Telefonit"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'phone_number')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Email Llogaria"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'email_address')
                               }}/>
                    <TextField type="password" variant="filled" hiddenLabel placeholder="Fjalëkalimi (Mund të ndryshohet)"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'password')
                               }}/>
                    <FormControl fullWidth variant="filled">
                        <NativeSelect
                            placeholder="Vetura"
                            sx={{height: '100%', background: 'rgba(0, 0, 0, 0.06)', padding: '0px 0px 0px 10px'}}
                            variant="filled"
                            onChange={(e) => {presenter.changeValues(e, 'transport')}}
                            inputProps={{
                                name: 'transport',
                                id: 'transport',
                            }}
                        >
                            {
                                presenter.transportList.map((item) => {
                                    return (
                                        <option key={item?.id} value={item?.model}>{item?.model}</option>
                                    )
                                })
                            }
                        </NativeSelect>
                    </FormControl>
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
                            presenter.documentUploaded ? 'Ngarko një dokument tjetër' : 'Ngarko dokumentin e identifikimit'
                        }
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => presenter.handleDocumentUpload(event)}
                            multiple
                        />
                    </Button>
                    <Button style={{gridColumn: 'span 2'}} size="large" variant="contained" onClick={() => {
                        presenter.addDriver()
                    }}>Shto Shofer</Button>
                </div>
            </div>
        </div>
    )
}

export default observer(ShtoShoferContent);