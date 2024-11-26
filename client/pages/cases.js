import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import UserHeader from "@/components/user/Header/UserHeader";
import {observer} from "mobx-react-lite";
import AdminPorositeContent from "@/components/admin/Cases/Cases/AdminCasesContent";
import UserPorositeContent from "@/components/user/Porosite/Porosite/UserPorositeContent";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);

const EmployeeHOC = dynamic(
    () => import("@/components/user/userHOC"),
    {
        ssr: false,
    }
);

const CasesPage = () => {
    const token = getTokenType();
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    },[]);
    return (
        <>
            {
                token === 'admin' && (
                    <>
                        <Head>
                            <title>Cases</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <AdminCasesContent />
                        </AdminHOC>
                    </>
                )
            }
            {
                token === 'employee' && (
                    <>
                        <Head>
                            <title>Cases</title>
                        </Head>
                        <EmployeeHOC>
                            <EmployeeHeader/>
                            <EmployeeCasesContent />
                        </EmployeeHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(CasesPage);