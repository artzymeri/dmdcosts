import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import AdminAddCaseContent from "@/components/admin/Cases/AddCase/AdminAddCaseContent";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const EmployeeHOC = dynamic(() => import("@/components/employee/employeeHOC"), {
  ssr: false,
});

const AddCasePage = () => {
  const token = getTokenType();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      {token === "admin" && (
        <>
          <Head>
            <title>Add Case | DMD Costs</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <AdminAddCaseContent />
          </AdminHOC>
        </>
      )}
      {token === "employee" && (
        <>
          <Head>
            <title>Add Case | DMD Costs</title>
          </Head>
          <EmployeeHOC>
            <EmployeeHeader />
          </EmployeeHOC>
        </>
      )}
    </>
  );
};

export default observer(AddCasePage);
