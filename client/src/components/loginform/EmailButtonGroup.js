import {Button, ButtonGroup} from "@mui/material";
import {observer} from "mobx-react-lite";

const EmailButtonGroup = ({presenter}) => {

    return (
        <ButtonGroup>
            <Button onClick={() => {
                presenter.changeLoginMode('email')
            }} variant="contained">Email</Button>
            <Button onClick={() => {
                presenter.changeLoginMode('phone_number')
            }} variant="outlined">
                Numri Telefonit</Button>
        </ButtonGroup>
    )
}

export default observer(EmailButtonGroup);