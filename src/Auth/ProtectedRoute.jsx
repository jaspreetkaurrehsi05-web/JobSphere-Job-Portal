import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../Services/AuthService";

export default function ProtectedRoute() {
  const email = AuthService.getEmail();
  const location = useLocation();

  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}