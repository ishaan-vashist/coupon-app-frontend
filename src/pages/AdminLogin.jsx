import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AdminLogin = () => {
  const { setToken } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      setError("⚠️ Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://coupon-app-1v1o.onrender.com/api/admin/login", credentials);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("❌ Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md transition transform hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">🔐 Admin Login</h1>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin border-t-2 border-white border-solid rounded-full h-5 w-5"></span>
          ) : (
            "🚀 Login"
          )}
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-5 text-center text-lg font-semibold text-red-600 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
