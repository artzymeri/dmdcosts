import Head from "next/head";
import { useEffect } from "react";
import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { Button, TextField } from "@mui/material";

const LoginPage = () => {
  const router = useRouter();
  const presenter = container.get(TYPES.LoginRegisterPresenter);

  useEffect(() => {
    const token = getTokenType();
    if (token) {
      router.push("./");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login | DMD Costs</title>
      </Head>
      <div className="login-parent">
        <div className="login-container">
          <img src="./dmd_logo.png" />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <h2>Login into your account</h2>
            <p style={{ color: "gray" }}>
              Please type your username and password to access{" "}
              <b>DMD Costs System</b>
            </p>
          </div>
          <TextField
            onChange={(e) => {
              presenter.changeLoginUserData("username", e.target.value);
            }}
            label="Username"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                presenter.login().then(() => {
                  router.push("./");
                });
              }
            }}
          />
          <TextField
            onChange={(e) => {
              presenter.changeLoginUserData("password", e.target.value);
            }}
            label="Password"
            variant="outlined"
            type="password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                presenter.login().then(() => {
                  router.push("/");
                });
              }
            }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#00491e" }}
            onClick={() => {
              presenter.login().then(() => {
                router.push("./");
              });
            }}
          >
            Login
          </Button>
          <div className="login-container-copyright-text">
            <span>{`© DMD Costs ${new Date().getFullYear()} All rights reserved`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(LoginPage);
