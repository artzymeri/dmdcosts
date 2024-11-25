import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import AdminKlientetContent from "@/components/admin/Klientet/AdminKlientetContent";
import dynamic from "next/dynamic";
import {observer} from "mobx-react-lite";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);

const KlientetPage = () => {
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
                            <title>Klientët</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <AdminKlientetContent />
                        </AdminHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(KlientetPage);