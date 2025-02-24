import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/userPanel" />;
  }

  if (role === "usuario" && user.role !== "usuario") {
    return <Navigate to="/" />; 
  }

  if (!user || user.role !== role) {
    window.location.href = "/403";  
  }

  return children || <Outlet />;
};

export default PrivateRoutes;
