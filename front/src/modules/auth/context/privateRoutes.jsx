import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ role, children }) => {
  const { user } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Si hay un mensaje de alerta, redirigir después de 3 segundos
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage(""); // Limpiar el mensaje de alerta
        // Aquí podrías hacer una redirección condicional si fuera necesario
      }, 3000); // 3 segundos
    }
  }, [alertMessage]);

  if (!user) {
    setAlertMessage("No estás registrado o no tienes sesión activa.");
    return <Navigate to="/" />;
  }

  if (role === "admin" && user.role !== "admin") {
    setAlertMessage("No tienes permisos de administrador");
    return <Navigate to="/userPanel" />;
  }

  if (role === "usuario" && user.role !== "usuario") {
    setAlertMessage("No tienes permisos de usuario");
    return <Navigate to="/" />;
  }

  if (!user || user.role !== role) {
    window.location.href = "/403";  
  }

  return children || <Outlet />;
};


export default PrivateRoutes;

