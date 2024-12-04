import {Alert, Button, Snackbar} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import AddClientForm from "./AddClientForm";
import {useState} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {PersonAddRounded} from "@mui/icons-material";

const AddClientContent = () => {
    const router = useRouter();

    const [presenter, setPresenter] = useState(
        container.get(TYPES.AdminAddClientPresenter)
    );

    return (
        <>
            <Snackbar open={presenter?.snackbarBoolean} autoHideDuration={3000}>
                <Alert
                    severity={presenter?.snackbarDetails?.title}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {presenter?.snackbarDetails?.message}
                </Alert>
            </Snackbar>
            <div className="admin-add-client-content-container">
                <div className="admin-add-client-content-title-container">
                    <h2>Add Client</h2>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            backgroundColor: "#00491e",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                        onClick={() => {
                            presenter.saveNewClient().then((res) => {
                                presenter.setSnackbar(true, res.data);
                            });
                        }}
                    >
                        <PersonAddRounded/>
                        <span>Confirm</span>
                    </Button>
                </div>
                <AddClientForm presenter={presenter}/>
            </div>
        </>
    );
};

export default observer(AddClientContent);
