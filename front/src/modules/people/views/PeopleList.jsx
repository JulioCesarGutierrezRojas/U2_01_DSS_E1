import React, { useState, useEffect } from "react";
import axios from "axios";
import { href, Navigate, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { ImAddressBook } from "react-icons/im";
import Swal from "sweetalert2"; // Importar SweetAlert2

const PeopleList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
  
    axios.get("http://localhost:3000/api/persons/getAll", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setUsers(response.data))
    .catch(error => console.error("Error al obtener los usuarios:", error));
  }, [token]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Usar SweetAlert2 para la confirmación antes de eliminar
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto después de eliminar el usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/api/persons/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          setUsers(users.filter(user => user.idUsuario !== id));
          Swal.fire("Eliminado", "El usuario ha sido eliminado exitosamente.", "success");
        })
        .catch(error => {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire("Error", "Hubo un error al eliminar el usuario.", "error");
        });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Verificar que todos los campos sean válidos
    if (!editingUser.nombre || !editingUser.apellidos || !editingUser.correo || !editingUser.telefono || !editingUser.edad || !editingUser.rol) {
      console.error("Faltan campos obligatorios");
      Swal.fire("Advertencia", "Por favor, complete todos los campos.", "warning");
      return;
    }

    // Validar que el teléfono tenga exactamente 10 dígitos
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(editingUser.telefono)) {
      console.error("El número de teléfono debe tener 10 dígitos.");
      Swal.fire("Error", "El número de teléfono debe tener exactamente 10 dígitos.", "error");
      return;
    }

    // Mostrar alerta de confirmación antes de guardar los cambios
    Swal.fire({
      title: "¿Estás seguro de guardar los cambios?",
      text: "Estos cambios se guardarán permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, proceder con la actualización
        axios.put(`http://localhost:3000/api/persons/update/${editingUser.idUsuario}`, editingUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          setUsers(users.map(user =>
            user.idUsuario === editingUser.idUsuario ? editingUser : user
          ));
          setIsModalOpen(false);
          Swal.fire("Éxito", "Cambios guardados correctamente", "success");
        })
        .catch(error => {
          console.error("Error al guardar los cambios:", error.response ? error.response.data : error.message);
          Swal.fire("Error", "Hubo un error al guardar los cambios.", "error");
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "65rem" }}>
        <h2 className="text-center mb-4">Lista de Usuarios</h2>

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => navigate("/usersForm")}
        >
          <FaPlus /> Agregar Usuario
        </button>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.idUsuario}>
                <td>{user.nombre} {user.apellidos}</td>
                <td>{user.correo}</td>
                <td>{user.telefono}</td>
                <td>{user.edad}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="btn btn-warning btn-sm me-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user.idUsuario)} className="btn btn-danger btn-sm">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        

        {isModalOpen && editingUser && (
          <div className="modal show d-block" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Usuario</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={editingUser.nombre}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      value={editingUser.apellidos}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      name="correo"
                      value={editingUser.correo}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      name="telefono"
                      value={editingUser.telefono}
                      onChange={handleInputChange}
                      className="form-control"
                      maxLength="10"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={editingUser.edad}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        )}
      </div>
      <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/bitacora")}
        >
          <ImAddressBook /> Bitacora
        </button>
    </div>
  );
};

export default PeopleList;
