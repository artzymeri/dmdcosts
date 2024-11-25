import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {Button, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

const RegjistrohuPageLeftSide = () => {
    const router = useRouter();
    const presenter = container.get(TYPES.LoginRegisterPresenter);


    return (
        <div className="kycu-left-side">
            <img src="./superpostafull-transparent.png"/>
            <h2>Regjistrohuni në platformë!</h2>
            <TextField label="Emri dhe mbiemri" variant="outlined" value={presenter?.newUserData?.name_surname}
                       onChange={(e) => {
                           presenter.changeNewUserData('name_surname', e.target.value)
                       }} autoComplete="off"/>
            <TextField label="Emri Biznesit" variant="outlined" value={presenter?.newUserData?.business_name}
                       onChange={(e) => {
                           presenter.changeNewUserData('business_name', e.target.value)
                       }} autoComplete="off"/>
            <TextField label="Adresa" variant="outlined" value={presenter?.newUserData?.location} onChange={(e) => {
                presenter.changeNewUserData('location', e.target.value)
            }} autoComplete="off"/>
            <TextField label="Numri Telefonit" variant="outlined" value={presenter?.newUserData?.phone_number}
                       onChange={(e) => {
                           presenter.changeNewUserData('phone_number', e.target.value)
                       }} autoComplete="off"/>
            <TextField label="Email Llogaria" variant="outlined" value={presenter?.newUserData?.email_address}
                       onChange={(e) => {
                           presenter.changeNewUserData('email_address', e.target.value)
                       }} autoComplete="off"/>
            <TextField label="Fjalëkalimi" variant="outlined" value={presenter?.newUserData?.password}
                       onChange={(e) => {
                           presenter.changeNewUserData('password', e.target.value)
                       }} type="password" autoComplete="off"/>
            <Button variant="contained" size="large" onClick={() => {
                presenter.registerUser()
                // window.location.reload()
            }}>Regjistrohu</Button>
            <div className="kycu-left-side-registration-text">
                <span>Posedoni llogari?</span>
                <span onClick={() => {
                    router.push('/kycu')
                }}>Kyçu!</span>
            </div>
        </div>
    );
};

export default observer(RegjistrohuPageLeftSide);
