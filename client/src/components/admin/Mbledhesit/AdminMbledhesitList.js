import {observer} from "mobx-react-lite";
import AdminMbledhesitListItem from "@/components/admin/Mbledhesit/AdminMbledhesitListItem";
import AdminMbledhesitDeletionDialog from "@/components/admin/Mbledhesit/AdminMbledhesitDeletionDialog";

const AdminMbledhesitList = ({presenter}) => {

    return (
        <>
            <AdminMbledhesitDeletionDialog presenter={presenter}/>
            <div className="admin-mbledhesit-list-container">
                {presenter?.driversData.map((item) => {
                    return (<AdminMbledhesitListItem presenter={presenter} key={item?.id}
                                                   item={item}/>)
                })}
                {presenter.driversData.length === 0 &&
                    <span style={{width: '100%', textAlign: 'center'}}>Nuk ka të dhëna</span>}
            </div>
        </>
    )
}

export default observer(AdminMbledhesitList);