import {Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const AdminPorosiaTitle = ({presenter}) => {

    const router = useRouter();

    return (
        <div className="admin-porosia-content-title-container">
            <Button className="kthehu-button" variant="outlined" startIcon={<ArrowBack/>} onClick={() => {
                router.push('/porosite')
            }}>
                Porositë
            </Button>
            <div className="admin-porosia-title-container">
                <span>Porosia numër:</span><span
                className="admin-porosia-id-banner">{`#${presenter.orderDetails?.id}`}</span>
            </div>
        </div>
    )
}

export default observer(AdminPorosiaTitle);