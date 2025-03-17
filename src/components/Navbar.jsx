import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaUserShield, FaSignOutAlt, FaHome } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { token, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-md fixed top-0 left-0 w-full z-50 h-16 flex items-center">
        <div className="container mx-auto flex justify-between items-center px-4">

          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-extrabold tracking-wide flex items-center space-x-2 hover:opacity-80 transition">
            🎟️ <span>CouponApp</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link className="text-gray-300 text-lg hover:text-white transition flex items-center space-x-2" to="/">
              <FaHome className="text-gray-400 text-xl hover:text-white transition" /> <span>Home</span>
            </Link>

            {token ? (
              <>
                {/* Dashboard Link */}
                <Link className="text-gray-300 text-lg hover:text-white transition flex items-center space-x-2" to="/dashboard">
                  <FaUserShield className="text-green-400 text-xl hover:text-green-500 transition" /> <span>Dashboard</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => handleLogout(navigate)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-red-800 hover:scale-105 transition-all duration-300"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Admin Login Button
              <Link className="bg-green-500 text-white px-5 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-green-700 hover:scale-105 transition-all duration-300" to="/admin">
                <FaUserShield className="text-xl" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Fix Overlapping: Add padding below the navbar */}
      <div className="pt-14"></div>
    </>
  );
};

export default Navbar;
