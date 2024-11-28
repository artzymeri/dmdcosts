import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import AdminShoferetContent from "@/components/admin/Shoferet/AdminShoferetContent";
import { observer } from "mobx-react-lite";
import AdminAutomjetetContent from "@/components/admin/Automjetet/AdminAutomjetetContent";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const EmployeesPage = () => {
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
            <title>Employees</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <AdminEmployeesContent />
          </AdminHOC>
        </>
      )}
    </>
  );
};

export default observer(EmployeesPage);
