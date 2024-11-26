import RegjistrohuPageLeftSide from "@/components/registerform/leftside";
import RegjistrohuPageRightSide from "@/components/registerform/rightside";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getTokenType} from "@/utils/auth";
import {observer} from "mobx-react-lite";


const RegisterPage = () => {

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
                <title>Register | DMD Costs</title>
            </Head>
            <div className="kycu-parent">
                <RegisterPageLeftSide />
                <RegisterPageRightSide />
            </div>
        </>
    )
}

export default observer(RegisterPage);