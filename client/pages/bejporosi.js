import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import UserHeader from "@/components/user/Header/UserHeader";
import BejPorosiContent from "@/components/user/BejPorosi/BejPorosiContent";
import {observer} from "mobx-react-lite";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);

const UserHOC = dynamic(
    () => import("@/components/user/userHOC"),
    {
        ssr: false,
    }
);

const BejPorosiPage = () => {
    const token = getTokenType();
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/kycu')
        }
    },[]);
    return (
        <>
            {
                token === 'user' && (
                    <>
                        <Head>
                            <title>Bëj Porosi</title>
                        </Head>
                        <UserHOC>
                            <UserHeader/>
                            <BejPorosiContent />
                        </UserHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(BejPorosiPage);