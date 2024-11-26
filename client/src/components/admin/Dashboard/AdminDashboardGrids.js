import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {Checkbox, FormControlLabel} from "@mui/material";
import AdminDashboardGridItem from "@/components/admin/Dashboard/AdminDashboardGridItem";
import {observer} from "mobx-react-lite";

const AdminDashboardGrids = () => {

    const presenter = container.get(TYPES.AdminDashboardPresenter)


    return (
        <div className="admin-dashboard-grids-container">
            <div className="admin-dashboard-grid-items-container">
                {
                    presenter?.dashboardGridItems.map((item) => {
                        return (
                            <AdminDashboardGridItem item={item} key={item.id}/>
                        )
                    })
                }
            </div>
            <div className="admin-dashboard-grid-column-right">
                <div className="admin-dashboard-postings-list-parent">
                    <div className="admin-dashboard-postings-list-parent-header">
                        <h2>Cases Today</h2>
                        <div className="admin-dashboard-postings-list-parent-header-checkbox-container">
                            <FormControlLabel control={<Checkbox/>} label="Porositë Aktive"/>
                        </div>
                    </div>
                    <div className="admin-dashboard-postings-list-container">
                        {
                            presenter?.newPostings.map((item) => {
                                return (
                                    <div key={item?.id} className="admin-dashboard-postings-list-item">
                                        <div className="admin-dashboard-postings-list-item-left">
                                            <h4>{item?.buyers_info?.name}</h4>
                                            <h5>{`${item?.buyers_info?.city}, ${item?.buyers_info?.state}`}</h5>
                                        </div>
                                        <CaseItemStatus status={item?.product_info?.status}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '147px',
                    width: '100%',
                    color: 'darkslategray',
                    border: '2px dashed lightgray',
                    background: 'white',
                    borderRadius: '15px',
                    cursor: 'not-allowed',
                    boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)'
                }}>To be added
                </div>
            </div>
        </div>
    )
}

export default observer(AdminDashboardGrids);