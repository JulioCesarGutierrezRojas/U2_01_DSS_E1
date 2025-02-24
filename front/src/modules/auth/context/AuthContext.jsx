import { createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService } from "../../../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);

            if (response.success) {
                const { id, role } = response;

                const newUser = { id, role };
                setUser(newUser);
                sessionStorage.setItem("user", JSON.stringify(newUser));

                return { success: true };
            } else {
                return { success: false, message: "Credenciales incorrectas" };
            }
        } catch (error) {
            console.error("Error en login:", error);
            return { success: false, message: "Error al conectar con el servidor" };
        }
    };

    
    const logout = () => {
        logoutService();
        setUser(null);
        sessionStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
