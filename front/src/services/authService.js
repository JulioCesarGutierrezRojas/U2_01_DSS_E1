import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";


const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, { email, password });

        const { token, role, id } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role); 
        localStorage.setItem("userId", id);  

        return { success: true, token, role, id };

    } catch (error) {
        console.error("Error en login:", error);
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
  