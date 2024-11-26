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

const EmployeeHOC = dynamic(
    () => import("@/components/user/userHOC"),
    {
        ssr: false,
    }
);

const AddCasePage = () => {
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
                token === 'employee' && (
                    <>
                        <Head>
                            <title>Add Case</title>
                        </Head>
                        <EmployeeHOC>
                            <EmployeeHeader/>
                            <AddCaseContent />
                        </EmployeeHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(AddCasePage);