import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

const ErrorPage403 = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-dark">
      <h1 className="display-1 fw-bold text-danger">403</h1>
      <p className="fs-3">Acceso denegado</p>
      <p className="text-muted">No tienes permisos para ver esta página.</p>
      <a href="/" className="btn btn-primary mt-3">
        Volver al inicio
      </a>
    </div>
  );
};

export default ErrorPage403;
