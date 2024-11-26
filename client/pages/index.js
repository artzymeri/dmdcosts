import {observer} from "mobx-react-lite";
import {getTokenType} from "@/utils/auth";
import {useEffect} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import UserHeader from "@/components/employee/Header/EmployeeHeader";
import Head from "next/head";
import AdminBallinaContent from "@/components/admin/Dashboard/AdminDashboardContent";
import UserBallinaContent from "@/components/employee/Dashboard/EmployeeDashboardContent";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {ssr: false}
);

const UserHOC = dynamic(
    () => import("@/components/employee/employeeHOC"),
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
                token === 'employee' && (
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