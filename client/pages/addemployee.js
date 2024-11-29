import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import ShtoShoferContent from "@/components/admin/Shoferet/ShtoShoferContent";
import ShtoAutomjetContent from "@/components/admin/Automjetet/ShtoAutomjetContent";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const AddEmployeePage = () => {
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
            <title>Add Employee | DMD Costs</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <AddEmployeeContent />
          </AdminHOC>
        </>
      )}
    </>
  );
};

export default observer(AddEmployeePage);
