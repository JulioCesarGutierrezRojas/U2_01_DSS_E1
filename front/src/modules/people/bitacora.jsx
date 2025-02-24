import Swal from "sweetalert2"; // Importar SweetAlert2
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { href, Navigate, useNavigate } from "react-router-dom";

const Bitacora = () =>{
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
  
        axios.get("http://localhost:3000/api/auth/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => setUsers(response.data))
        .catch(error => console.error("Error al obtener los usuarios:", error));
      }, [token]);
                

    return(
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                  <div className="card p-4 shadow-lg rounded-4" style={{ width: "65rem" }}>
                    <h2 className="text-center mb-4">Bitácora</h2>
            
            
                    <table className="table mt-3">
                      <thead>
                        <tr>
                          <th>Nombre Completo</th>
                          <th>Fecha</th>
                          <th>Operación</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(log => (
                          <tr key={log.idBitacora}>
                            <td>{log.nombreUsuario}</td>
                            <td>{log.fecha}</td>
                            <td>{log.operacion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
        </>
    )
}

export default Bitacora;