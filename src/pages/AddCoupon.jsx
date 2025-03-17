import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const addCoupon = async () => {
    if (!code.trim()) {
      setMessage("⚠️ Please enter a valid coupon code!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://coupon-app-1v1o.onrender.com/api/coupons/admin/add",
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Coupon added successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage("❌ Error adding coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md transition transform hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">✨ Add New Coupon</h1>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* Add Coupon Button */}
        <button
          onClick={addCoupon}
          className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin border-t-2 border-white border-solid rounded-full h-5 w-5"></span>
          ) : (
            "➕ Add Coupon"
          )}
        </button>

        {/* Success/Error Message */}
        {message && (
          <p className="mt-5 text-center text-lg font-semibold text-gray-900 animate-fadeIn">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddCoupon;
