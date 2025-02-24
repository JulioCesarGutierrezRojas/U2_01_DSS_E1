import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () =>{

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const manejoSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!email.trim()) {
            setError("El correo no puede estar vacío");
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Ingrese un correo válido");
            return;
        }

        if (email.trim() !== email) {
            setError("El correo no puede tener espacios al principio o al final");
            return;
        }

        if (!password.trim()) {
            setError("La contraseña no puede estar vacía");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 5 caracteres");
            return;
        }

        if (password.trim() !== password) {
            setError("La contraseña no puede tener espacios al principio o al final");
            return;
        }
    
        const response = await login(email, password); 
    
        if (response.success) {
            navigate("/usersList");
        } else {
            setError(response.message);
        }
    };

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg rounded-4" style={{ width: "25rem", height: "400px" }}>

                <h2 className="text-center mb-5">Iniciar Sesión</h2>

                <form onSubmit={ manejoSubmit }>
                    <div className="mb-3">
                        <label className="form-label">Correo Electronico</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser />
                            </span>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaLock />
                            </span>
                            <input
                                type={mostrarPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setMostrarPassword(!mostrarPassword)}
                                >
                                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && (<p className="text-danger text-center my-2 mb-3">{error}</p>)}
                
                    <button type="submit" className="btn btn-primary w-100">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;