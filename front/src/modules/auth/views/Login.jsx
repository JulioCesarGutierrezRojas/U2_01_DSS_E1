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

    const manejoSubmit = (e) =>{
        e.preventDefault();

        const response = login(email, password);
        if (response.success) {
            navigate("/usersList");
        }else{
            setError(response.message);
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg rounded-4" style={{ width: "25rem", height: "400px" }}>

                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={ manejoSubmit }>
                    <div class="mb-3">
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

                    <div class="mb-4">
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
                
                    <button type="submit" className="btn btn-primary w-100">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;