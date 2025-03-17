import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getClaimHistory, deleteCoupon, getCoupons } from "../api/api";

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    } else {
      fetchCoupons();
      fetchHistory();
    }
  }, [token, navigate]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await getCoupons(token);
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons", err);
      setError("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await getClaimHistory(token);
      setClaimHistory(res.data);
    } catch (err) {
      console.error("Error fetching claim history", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    try {
      await deleteCoupon(token, id);
      setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== id)); // Update UI
    } catch (err) {
      console.error("Error deleting coupon:", err);
      alert("Failed to delete coupon. Try again.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center bg-white p-6 shadow-lg rounded-lg mb-6 border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
          onClick={() => navigate("/add-coupon")}
        >
          + Add Coupon
        </button>
      </div>

      {/* Loading/Error Messages */}
      {loading && <p className="text-center text-gray-600 text-lg animate-pulse">Loading coupons...</p>}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      {/* Coupons Table */}
      <div className="overflow-x-auto mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Coupons</h2>
        <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-blue-600 text-white text-lg">
            <tr>
              <th className="border p-4">Coupon Code</th>
              <th className="border p-4">Status</th>
              <th className="border p-4">Claimed By (IP)</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="border text-center hover:bg-gray-50 transition">
                  <td className="border p-4 font-semibold text-gray-800">{coupon.code}</td>
                  <td
                    className={`border p-4 font-bold ${
                      coupon.status === "available" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {coupon.status}
                  </td>
                  <td className="border p-4 text-gray-700">{coupon.assignedTo || "Not Claimed"}</td>
                  <td className="border p-4">
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 font-medium">No coupons available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Claim History Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Claim History</h2>
        <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-gray-700 text-white text-lg">
            <tr>
              <th className="border p-4">Coupon Code</th>
              <th className="border p-4">Claimed By (IP)</th>
              <th className="border p-4">Claimed At</th>
            </tr>
          </thead>
          <tbody>
            {claimHistory.length > 0 ? (
              claimHistory.map((history) => (
                <tr key={history._id} className="border text-center hover:bg-gray-50 transition">
                  <td className="border p-4 font-semibold text-gray-800">{history.code}</td>
                  <td className="border p-4 text-gray-700">{history.assignedTo || "Unknown"}</td>
                  <td className="border p-4 text-gray-700">
                    {history.updatedAt ? new Date(history.updatedAt).toLocaleString() : "Invalid Date"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500 font-medium">No claims recorded.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
