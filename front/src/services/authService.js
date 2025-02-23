
const login = (email, password) => {

    // Simulación de autenticación
    if (email === "admin@example.com" && password === "123456") {
      localStorage.setItem("user", JSON.stringify({ email }));
      return { success: true, user: { email } };
    }
    return { success: false, message: "Credenciales incorrectas" };
};
  

const logout = () => {
    localStorage.removeItem("user");
};
  
const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
  
export { login, logout, getUser };
  