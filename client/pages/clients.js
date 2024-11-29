import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import AdminClientsContent from "@/components/admin/Clients/AdminClientsContent";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const EmployeeHOC = dynamic(() => import("@/components/employee/employeeHOC"), {
  ssr: false,
});

const ClientsPage = () => {
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
            <title>Cases</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <AdminClientsContent />
          </AdminHOC>
        </>
      )}
      {token === "employee" && (
        <>
          <Head>
            <title>Cases</title>
          </Head>
          <EmployeeHOC>
            <EmployeeHeader />
            <EmployeeCasesContent />
          </EmployeeHOC>
        </>
      )}
    </>
  );
};

export default observer(ClientsPage);
