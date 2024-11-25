import {Button, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import EmailButtonGroup from "@/components/loginform/EmailButtonGroup";
import PhoneNumberButtonGroup from "@/components/loginform/PhoneNumberButtonGroup";
import {observer} from "mobx-react-lite";

const KyçuPageLeftSide = () => {

    const router = useRouter();
    const presenter = container.get(TYPES.LoginRegisterPresenter);

    return (
        <div className="kycu-left-side">
            <img src="./superpostafull-transparent.png"/>
            <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <h2>Kyçuni në llogarinë tuaj!</h2>
                <p style={{color: 'gray'}}>Zgjedhni mënyrën e kyçjes në llogari:</p>
            </div>

            {presenter?.vm?.login_mode === 'email' ?
                <>
                    <EmailButtonGroup presenter={presenter}/>
                    <TextField onChange={(e) => {
                        presenter.changeLoginUserData('email_address', e.target.value)
                    }} label="Email Llogaria" variant="outlined"/>
                </> :
                <>
                    <PhoneNumberButtonGroup presenter={presenter}/>
                    <TextField
                        onChange={(e) => {
                            presenter.changeLoginUserData('phone_number', e.target.value)
                        }}
                        label="Numri Telefonit" variant="outlined"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                presenter.login().then(() => {
                                    router.push('./')
                                })
                            }
                        }}
                    />
                </>
            }
            <TextField
                onChange={(e) => {
                    presenter.changeLoginUserData('password', e.target.value)
                }}
                label="Fjalëkalimi" variant="outlined" type="password"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        presenter.login().then(() => {
                            router.push('/')
                        })
                    }
                }}
            />
            <Button variant="contained" size="large" onClick={() => {
                presenter.login().then(() => {
                    router.push('./')
                })
            }}>Kyçu</Button>
            <div className="kycu-left-side-registration-text">
                <span>Nuk posedoni llogari?</span>
                <span onClick={() => {
                    router.push('/regjistrohu')
                }}>Regjistrohu!</span>
            </div>
        </div>)
}

export default observer(KyçuPageLeftSide);