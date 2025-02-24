import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, { email, password });

        const { token } = response.data;
        localStorage.setItem("token", token);
        return { success: true, token };

    } catch (error) {
        return { success: false, message: "Credenciales incorrectas" };
    }
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
};

const getToken = () => localStorage.getItem("token");

const getUserRole = () => localStorage.getItem("role");

const getUserId = () => localStorage.getItem("userId");

export { 
    login, 
    logout, 
    getToken, 
    getUserRole, 
    getUserId 
};
  