
import { createContext, useState, useEffect } from "react";
import { getUser, login as loginService, logout as logoutService } from "../../../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const login = (email, password) => {
        const response = loginService(email, password);
        if (response.success) {
            setUser(response.user);
        }
        return response;
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
