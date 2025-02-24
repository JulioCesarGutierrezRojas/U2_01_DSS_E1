import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const PeopleList = () => {
  const [users, setUsers] = useState([
    { id: 1, nomcompleto: "Juan Pérez", correo: "juan@example.com", telefono: "123456789", edad: 25 },
    { id: 2, nomcompleto: "Ana Gómez", correo: "ana@example.com", telefono: "987654321", edad: 30 },
  ]);
  
  const [editingUser, setEditingUser] = useState(null);  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  
  const handleEdit = (user) => {
    setEditingUser(user);  
    setIsModalOpen(true); 
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    setUsers(users.map(user =>
      user.id === editingUser.id ? editingUser : user
    ));
    setIsModalOpen(false);  
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
              <tr key={user.id}>
                <td>{user.nomcompleto}</td>
                <td>{user.correo}</td>
                <td>{user.telefono}</td>
                <td>{user.edad}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="btn btn-warning btn-sm me-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
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
                    <label className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      name="nomcompleto"
                      value={editingUser.nomcompleto}
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
    </div>
  );
};

export default PeopleList;
