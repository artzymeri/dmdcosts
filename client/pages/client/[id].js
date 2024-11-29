import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getTokenType } from "@/utils/auth";
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import { observer } from "mobx-react-lite";
import { container } from "@/architecture/ioc/ioc";
import { TYPES } from "@/architecture/ioc/types";
import { CircularProgress } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import AdminClientView from "@/components/admin/Clients/ClientView/AdminClientView";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});

const ClientPage = () => {
  const token = getTokenType();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [successfulLoad, setSuccessfulLoad] = useState(false);
  const [presenter, setPresenter] = useState(
    container.get(TYPES.AdminClientViewPresenter)
  );

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (presenter && id) {
        setLoading(true);
        try {
          if (token === "admin") {
            await presenter.getClientDetails(parseInt(id));
            if (
              presenter.clientDetails?.title !== "error" &&
              presenter.clientDetails
            ) {
              setSuccessfulLoad(true);
            }
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      }
    };

    fetchData();
  }, [id, presenter?.vm?.refresh_state]);

  return (
    <>
      {token === "admin" && (
        <>
          <Head>
            <title>{`Client #${id}`}</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            {loading && (
              <div className="backdrop-container">
                <CircularProgress />
              </div>
            )}
            {!loading && successfulLoad && (
              <AdminClientView presenter={presenter} />
            )}
            {!loading && !successfulLoad && (
              <div className="admin-client-content-container">
                <div className="no-access-order-view">
                  <WarningOutlined />
                  <span>Something went wrong!</span>
                </div>
              </div>
            )}
          </AdminHOC>
        </>
      )}
    </>
  );
};

export default observer(ClientPage);
