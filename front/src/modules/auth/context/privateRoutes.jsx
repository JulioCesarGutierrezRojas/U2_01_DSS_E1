import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role || user.role !== "admin") {
    return <Navigate to="/403" />;
  }

  return children || <Outlet />;
};

export default PrivateRoutes;
