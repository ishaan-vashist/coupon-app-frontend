import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClaimHistory, getCoupons, deleteCoupon, addCoupon } from "../api/api";

const Admin = () => {
  const [coupons, setCoupons] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [newCoupon, setNewCoupon] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin"); // ✅ Redirect to Admin Login instead of a non-existing route
      return;
    }
    fetchCoupons();
    fetchHistory();
  }, [token, navigate]);

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons(token);
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons", err);
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

  const handleAddCoupon = async () => {
    try {
      await addCoupon(token, newCoupon);
      setNewCoupon("");
      fetchCoupons();
    } catch (err) {
      console.error("Error adding coupon", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600">Admin Panel</h1>

      {/* Add Coupon */}
      <div className="flex items-center justify-center my-6">
        <input
          type="text"
          value={newCoupon}
          onChange={(e) => setNewCoupon(e.target.value)}
          placeholder="Enter new coupon code"
          className="border p-2 rounded-lg mr-2"
        />
        <button
          onClick={handleAddCoupon}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <h2 className="text-xl font-semibold mt-6">Coupons</h2>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border p-3">Code</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="border text-center">
              <td className="border p-3">{coupon.code}</td>
              <td className="border p-3">{coupon.status}</td>
              <td className="border p-3">
                <button onClick={() => deleteCoupon(token, coupon._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
