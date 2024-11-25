import {observer} from "mobx-react-lite";
import UserPorositeHeader from "@/components/user/Porosite/Porosite/UserPorositeHeader";
import UserPorositeList from "@/components/user/Porosite/Porosite/UserPorositeList";
import {useEffect, useMemo} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {Button} from "@mui/material";
import {useRouter} from "next/router";


const UserPorositeContent = () => {

    const router = useRouter()

    const presenter = useMemo(() => container.get(TYPES.UserPorositePresenter), []);

    useEffect(() => {
        presenter.getClientOrders();
    }, []);

    return (
        <div className="user-porosite-content-container">
            <div className="user-porosite-content-title-container">
                <h2>
                    Porositë tuaja
                </h2>
                <Button variant="contained" onClick={() => {router.push('/bejporosi')}}>
                    Bëj Porosi
                </Button>
            </div>
            <UserPorositeHeader presenter={presenter}/>
            <UserPorositeList presenter={presenter}/>
        </div>
    )
}

export default observer(UserPorositeContent);