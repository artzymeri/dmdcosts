import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import InvoicesContent from "@/components/admin/Invoices/InvoicesContent";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const InvoicesPage = () => {
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
            <title>Invoices | DMD Costs</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <InvoicesContent />
          </AdminHOC>
        </>
      )}
    </>
  );
};

export default observer(InvoicesPage);
