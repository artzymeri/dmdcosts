import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import AdminShoferetContent from "@/components/admin/Shoferet/AdminShoferetContent";
import {observer} from "mobx-react-lite";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);

const TransportiPage = () => {
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
                token === 'admin' && (
                    <>
                        <Head>
                            <title>Transporti</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <AdminShoferetContent />
                        </AdminHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(TransportiPage);