import Swal from "sweetalert2"; // Importar SweetAlert2
import React, { useState, useEffect } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

const Bitacora = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
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

    // Calcular el índice de los elementos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card p-4 shadow-lg rounded-4" style={{ width: "65rem" }}>
                    <h2 className="text-center mb-4">Bitácora</h2>
                            <button
                              className="btn btn-primary w-100 mb-3"
                              onClick={() => navigate("/usersList")}
                            >
                              <ImArrowLeft2  /> Regresar 
                            </button>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Fecha</th>
                                <th>Operación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(log => (
                                <tr key={log.idBitacora}>
                                    <td>{log.nombreUsuario}</td>
                                    <td>{log.fecha}</td>
                                    <td>{log.operacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <Pagination className="justify-content-center">
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {currentPage > 2 && <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>}
                        {currentPage > 3 && <Pagination.Ellipsis />}
                        {currentPage > 1 && <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        {currentPage < totalPages && <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
                        {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                        {currentPage < totalPages - 1 && <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </div>
        </>
    );
};

export default Bitacora;