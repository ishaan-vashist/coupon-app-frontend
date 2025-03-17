import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://coupon-app-1v1o.onrender.com";

// ✅ Fetch claim history (Admin Only)
export const getClaimHistory = (token) =>
  axios.get(`${API_URL}/api/admin/claim-history`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Fetch all coupons (Admin Dashboard)
export const getCoupons = (token) =>
  axios.get(`${API_URL}/api/admin/coupons`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Admin login
export const adminLogin = (credentials) =>
  axios.post(`${API_URL}/api/admin/login`, credentials);

// ✅ Add new coupon (Admin Only)
export const addCoupon = (token, code) =>
  axios.post(
    `${API_URL}/api/admin/coupons/add`,
    { code },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// ✅ Update coupon status (Toggle Availability)
export const updateCouponStatus = (token, id, status) =>
  axios.put(
    `${API_URL}/api/admin/coupon/update/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// ✅ Delete a coupon
export const deleteCoupon = (token, id) =>
  axios.delete(`${API_URL}/api/admin/coupon/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Fetch available coupons (For Users to Choose)
export const getAvailableCoupons = () =>
  axios.get(`${API_URL}/api/coupons/available`);

// ✅ Claim a specific coupon by ID (User selects)
export const claimCoupon = (id) =>
  axios.put(`${API_URL}/api/coupons/claim/${id}`);
