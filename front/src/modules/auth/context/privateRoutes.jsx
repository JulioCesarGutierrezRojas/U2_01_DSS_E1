import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role === null ) {
    return <Navigate to="/" />;
  }

  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/userPanel" />;
  }

  if (role === "usuario" && user.role !== "usuario") {
    return <Navigate to="/" />;
  }

  if (!user || user.role !== role) {
    return <Navigate to="/403" />;
  }

  if (!user || user.role !== role) {
    return <Navigate to="/403" />;
  }

  if (!user) {
    return <Navigate to="/403" />;
  }

  return children || <Outlet />;
};

export default PrivateRoutes;
