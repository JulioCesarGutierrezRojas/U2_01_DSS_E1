
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const privateRoutes = ({ children }) => {

  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;

};

export default privateRoutes;
