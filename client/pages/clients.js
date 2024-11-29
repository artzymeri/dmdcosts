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
            <title>Clients | DMD Costs</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <AdminClientsContent />
          </AdminHOC>
        </>
      )}
    </>
  );
};

export default observer(ClientsPage);
