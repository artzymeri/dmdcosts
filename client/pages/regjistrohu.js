import RegjistrohuPageLeftSide from "@/components/registerform/leftside";
import RegjistrohuPageRightSide from "@/components/registerform/rightside";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getTokenType} from "@/utils/auth";
import {observer} from "mobx-react-lite";


const RegjistrohuPage = () => {

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
                <title>Regjistrohu | SuperPosta</title>
            </Head>
            <div className="kycu-parent">
                <RegjistrohuPageLeftSide />
                <RegjistrohuPageRightSide />
            </div>
        </>
    )
}

export default observer(RegjistrohuPage);