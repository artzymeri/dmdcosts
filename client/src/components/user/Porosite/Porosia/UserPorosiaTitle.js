import {Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const UserPorosiaTitle = ({presenter}) => {

    const router = useRouter();

    return (
        <div className="user-porosia-content-title-container">
            <Button className="kthehu-button" variant="outlined" startIcon={<ArrowBack/>} onClick={() => {
                router.push('/porosite')
            }}>
                Porositë tuaja
            </Button>
            <div className="user-porosia-title-container">
                <span>Porosia numër:</span><span
                className="user-porosia-id-banner">{`#${presenter.orderDetails?.id}`}</span>
            </div>
        </div>
    )
}

export default observer(UserPorosiaTitle);