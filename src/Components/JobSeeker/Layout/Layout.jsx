import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AuthService from "../../../Services/AuthService";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Layout() {
  const userType = AuthService.getUserType();
  const email = AuthService.getEmail();
  const nav = useNavigate();

  useEffect(() => {
    if (email !== null && userType == "admin") {
      toast.error("Unauthorized");

      nav("/admin");
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
