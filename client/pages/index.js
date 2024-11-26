import {observer} from "mobx-react-lite";
import {getTokenType} from "@/utils/auth";
import {useEffect} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import UserHeader from "@/components/user/Header/UserHeader";
import Head from "next/head";
import AdminBallinaContent from "@/components/admin/Dashboard/AdminDashboardContent";
import UserBallinaContent from "@/components/user/Ballina/UserBallinaContent";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {ssr: false}
);

const UserHOC = dynamic(
    () => import("@/components/user/userHOC"),
    {ssr: false}
);

const HomePage = () => {
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
                            <title>Dashboard | DMD Costs</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <AdminDashboardContent />
                        </AdminHOC>
                    </>
                )
            }
            {
                token === 'user' && (
                    <>
                        <Head>
                            <title>Dashboard | DMD Costs</title>
                        </Head>
                        <EmployeeHOC>
                            <EmployeeHeader/>
                            <EmployeeDashboardContent />
                        </EmployeeHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(HomePage);