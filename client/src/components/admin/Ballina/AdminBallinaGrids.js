import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {Checkbox, FormControlLabel} from "@mui/material";
import AdminBallinaGridItem from "@/components/admin/Ballina/AdminBallinaGridItem";
import PostingItemStatus from "@/components/admin/PostingItemStatus";
import {observer} from "mobx-react-lite";

const AdminBallinaGrids = () => {

    const router = useRouter();
    const presenter = container.get(TYPES.AdminBallinaPresenter)


    return (
        <div className="admin-ballina-grids-container">
            <div className="admin-ballina-grid-items-container">
                {
                    presenter?.ballinaGridItems.map((item) => {
                        return (
                            <AdminBallinaGridItem item={item} key={item.id}/>
                        )
                    })
                }
            </div>
            <div className="admin-ballina-grid-column-right">
                <div className="admin-ballina-postings-list-parent">
                    <div className="admin-ballina-postings-list-parent-header">
                        <h2>Porositë sot</h2>
                        <div className="admin-ballina-postings-list-parent-header-checkbox-container">
                            <FormControlLabel control={<Checkbox/>} label="Porositë Aktive"/>
                        </div>
                    </div>
                    <div className="admin-ballina-postings-list-container">
                        {
                            presenter?.newPostings.map((item) => {
                                return (
                                    <div key={item?.id} className="admin-ballina-postings-list-item">
                                        <div className="admin-ballina-postings-list-item-left">
                                            <h4>{item?.buyers_info?.name}</h4>
                                            <h5>{`${item?.buyers_info?.city}, ${item?.buyers_info?.state}`}</h5>
                                        </div>
                                        <PostingItemStatus status={item?.product_info?.status}/>
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
                }}>Mbetet për tu shtuar
                </div>
            </div>
        </div>
    )
}

export default observer(AdminBallinaGrids);