import { createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getUserId, getUserRole } from "../../../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = getUserId();
        const role = getUserRole();
        
        if (userId && role) {
            setUser({ id: userId, role });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);

            if (response.success) {
                setUser({ id: response.id, role: response.role });
                return { success: true };
            } else {
                return { success: false, message: "Credenciales incorrectas" };
            }
        } catch (error) {
            return { success: false, message: "Error al conectar con el servidor" };
        }
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
