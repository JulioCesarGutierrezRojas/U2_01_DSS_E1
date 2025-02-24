import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../modules/auth/context/AuthContext";
import axios from "axios";

const PanelPerson = () => {
  const { user } = useContext(AuthContext); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:3001/api/persons/id", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) return <p>Cargando datos...</p>;

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg w-96">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario</h1>
      <p><strong>Nombre:</strong> {userData.nombre}</p>
      <p><strong>Apellidos:</strong> {userData.apellidos}</p>
      <p><strong>Correo:</strong> {userData.correo}</p>
      <p><strong>Teléfono:</strong> {userData.telefono}</p>
      <p><strong>Edad:</strong> {userData.edad}</p>
      <p><strong>Rol:</strong> {userData.rol}</p>
    </div>
  );
};

export default PanelPerson;
