import {useEffect} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import AdminAutomjetetHeader from "@/components/admin/Automjetet/AdminAutomjetetHeader";
import AdminAutomjetetList from "@/components/admin/Automjetet/AdminAutomjetetList";

const AdminAutomjetetContent = () => {

    let presenter = container.get(TYPES.AdminAutomjetetPresenter);

    const router = useRouter();

    useEffect(() => {
        presenter.getAutomjetetData()
    },[]);


    return (
        <div className="admin-automjetet-content-container">
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>
                    Automjetet
                </h2>
                <Button variant="contained" onClick={() => {router.push('/shtoautomjet')}}>
                    Shto Automjet
                </Button>
            </div>
            <AdminAutomjetetHeader presenter={presenter}/>
            <AdminAutomjetetList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminAutomjetetContent);