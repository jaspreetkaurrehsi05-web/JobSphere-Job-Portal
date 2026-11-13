import { Outlet, useNavigate } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AuthService from "../../../Services/AuthService";

export default function AdminLayout() {
  const userType = AuthService.getUserType();
  const email = AuthService.getEmail();
  const nav = useNavigate();

  useEffect(() => {
    if (userType !== "admin" || email == null) {
      toast.error("Unauthorized");
      AuthService.logout();
      nav("/login");
    }
  }, []);

  return (
    <>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
}
