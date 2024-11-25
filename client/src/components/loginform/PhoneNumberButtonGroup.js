import {Button, ButtonGroup} from "@mui/material";
import {observer} from "mobx-react-lite";

const PhoneNumberButtonGroup = ({presenter}) => {

    return (
        <ButtonGroup>
            <Button onClick={() => {
                presenter.changeLoginMode('email')
            }} variant="outlined">Email</Button>
            <Button onClick={() => {
                presenter.changeLoginMode('phone_number')
            }} variant="contained">
                Numri Telefonit</Button>
        </ButtonGroup>
    )
}

export default observer(PhoneNumberButtonGroup);