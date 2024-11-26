import {Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const AdminCaseTitle = ({presenter}) => {

    const router = useRouter();

    return (
        <div className="admin-case-content-title-container">
            <Button className="back-button" variant="outlined" startIcon={<ArrowBack/>} onClick={() => {
                router.push('/cases')
            }}>
                Cases
            </Button>
            <div className="admin-case-title-container">
                <span>Case number:</span><span
                className="admin-case-id-banner">{`#${presenter.caseDetails?.id}`}</span>
            </div>
        </div>
    )
}

export default observer(AdminCaseTitle);