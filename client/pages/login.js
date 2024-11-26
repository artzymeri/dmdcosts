import KyçuPageLeftSide from "@/components/loginform/leftside";
import KyçuPageRightSide from "@/components/loginform/rightside";
import Head from "next/head";
import {useEffect} from "react";
import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

const LoginPage = () => {

    const router = useRouter()

    useEffect(() => {
        const token = getTokenType()
        if (token) {
            router.push('./')
        }
    },[]);

    return (
        <>
            <Head>
                <title>Login | DMD Costs</title>
            </Head>
            <div className="login-parent">
                <LoginPageLeftSide />
                <LoginPageRightSide />
            </div>
        </>
    )
}

export default observer(LoginPage);