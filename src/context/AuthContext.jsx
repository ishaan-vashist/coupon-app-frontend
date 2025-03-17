import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decoded.exp < currentTime) {
          handleLogout(); // Token expired, logout
        }
      } catch (err) {
        console.error("Invalid Token", err);
        handleLogout();
      }
    }
  }, [token]);

  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/admin"); // ✅ Pass navigate as an argument
  };

  return (
    <AuthContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
