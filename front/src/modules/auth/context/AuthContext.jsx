import { createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService } from "../../../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);

            if (response.success) {
                const { token, userId, role } = response;

                const newUser = { token, userId, role };
                setUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));

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
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
