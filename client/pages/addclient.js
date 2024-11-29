import { getTokenType } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import AddClientContent from "@/components/admin/Clients/AddClient/AddClientContent";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const AddClientPage = () => {
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
            <title>Add Client | DMD Costs</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            <AddClientContent />
          </AdminHOC>
        </>
      )}
    </>
  );
};

export default observer(AddClientPage);
