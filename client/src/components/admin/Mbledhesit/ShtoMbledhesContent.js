import {Button, TextField} from "@mui/material";
import {Textarea} from "@mui/joy";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from "next/router";

const ShtoMbledhesContent = () => {

    let presenter = container.get(TYPES.UserBejPorosiPresenter);
    const router = useRouter();

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
                                   presenter.changeValues(e, 'receiver_name_surname')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Numri telefonit"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'receiver_phone_number')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Numri telefonit sekondar"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'receiver_phone_number_2')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Qyteti"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'receiver_city')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Shteti"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'receiver_state')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Adresa e plotë"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'receiver_full_address')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Çmimi i produktit"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'product_price')
                               }}/>
                    <TextField variant="filled" hiddenLabel placeholder="Përshkrimi i produktit"
                               onChange={(e) => {
                                   presenter.changeValues(e, 'product_description')
                               }}/>
                    <Textarea style={{gridColumn: 'span 2', background: 'rgba(0, 0, 0, 0.06)'}} minRows={5}
                              variant="soft" placeholder="Koment rreth produktit"
                              onChange={(e) => {
                                  presenter.changeValues(e, 'comment')
                              }}/>
                    <Button style={{gridColumn: 'span 2'}} size="large" variant="contained" onClick={() => {
                        presenter.createOrder()
                    }}>Shto Shofer</Button>
                </div>
            </div>
        </div>
    )
}

export default observer(ShtoMbledhesContent);