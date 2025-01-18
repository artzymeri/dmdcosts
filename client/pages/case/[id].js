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
import AdminCaseView from "@/components/admin/Cases/Case/AdminCaseView";
import EmployeeHeader from "@/components/employee/Header/EmployeeHeader";
import EmployeeCaseView from "@/components/employee/Cases/Case/EmployeeCaseView";
import Cookies from "js-cookie";

const AdminHOC = dynamic(() => import("@/components/admin/adminHOC"), {
  ssr: false,
});
const EmployeeHOC = dynamic(() => import("@/components/employee/employeeHOC"), {
  ssr: false,
});

const CasePage = () => {
  const token = getTokenType();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [successfulLoad, setSuccessfulLoad] = useState(false);
  const [presenter, setPresenter] = useState(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (token === "admin") {
      setPresenter(container.get(TYPES.AdminCasePresenter));
    } else if (token === "employee") {
      setPresenter(container.get(TYPES.EmployeeCasePresenter));
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (presenter && id) {
        setLoading(true);
        try {
          if (token === "employee") {
            const user = JSON.parse(Cookies.get("employeeData"));
            await presenter.getCaseDetailsAsEmployee(parseInt(id), user?.id);
            if (presenter.vm.case_details?.title !== "error") {
              setSuccessfulLoad(true);
            }
          } else if (token === "admin") {
            await presenter.getCaseDetailsAsAdmin(parseInt(id));
            if (presenter.vm.case_details?.title !== "error") {
              setSuccessfulLoad(true);
            }
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
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
            <title>{`Case #${id} | DMD Costs`}</title>
          </Head>
          <AdminHOC>
            <AdminHeader />
            {loading && (
              <div className="admin-case-content-container">
                <div className="backdrop-container">
                  <CircularProgress />
                </div>
              </div>
            )}
            {!loading && successfulLoad && (
              <AdminCaseView presenter={presenter} />
            )}
            {!loading && !successfulLoad && (
              <div className="employee-case-content-container">
                <div className="no-access-order-view">
                  <WarningOutlined />
                  <span>Something went wrong!</span>
                </div>
              </div>
            )}
          </AdminHOC>
        </>
      )}
      {token === "employee" && (
        <>
          <Head>
            <title>{`Case #${id}`}</title>
          </Head>
          <EmployeeHOC>
            <EmployeeHeader />
            {loading && (
              <div className="backdrop-container">
                <CircularProgress />
              </div>
            )}
            {!loading && successfulLoad && (
              <EmployeeCaseView presenter={presenter} />
            )}
            {!loading && !successfulLoad && (
              <div className="employee-case-content-container">
                <div className="no-access-order-view">
                  <WarningOutlined />
                  <span>Something went wrong!</span>
                </div>
              </div>
            )}
          </EmployeeHOC>
        </>
      )}
    </>
  );
};

export default observer(CasePage);
