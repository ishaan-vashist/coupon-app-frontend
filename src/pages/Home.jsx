import { useState, useEffect } from "react";
import { getAvailableCoupons, claimCoupon } from "../api/api";
import { FaTicketAlt, FaHandPointRight } from "react-icons/fa"; // Importing icons

const Home = () => {
  const [coupons, setCoupons] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await getAvailableCoupons();
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons", err);
    }
  };

  const handleClaim = async (id) => {
    try {
      const res = await claimCoupon(id);
      setMessage(`✅ Successfully claimed: ${res.data.coupon}`);
      fetchCoupons();
    } catch (err) {
      setMessage("❌ Error claiming coupon");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-center text-white">
      {/* Hero Section */}
      <div className="text-center mt-12">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Welcome to Coupon App</h1>
        <p className="text-lg mt-2 opacity-90">Unlock exclusive discounts by claiming your coupon today!</p>
      </div>

      {/* How It Works Section */}
      <div className="bg-white text-gray-800 p-6 shadow-lg rounded-lg w-11/12 md:w-3/4 lg:w-2/3 mt-8">
        <h2 className="text-3xl font-semibold text-center flex items-center justify-center">
          🔥 How It Works?
        </h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4">
            <FaHandPointRight className="text-blue-500 text-2xl" />
            <p className="text-lg">Browse the available coupons listed below.</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaTicketAlt className="text-green-500 text-2xl" />
            <p className="text-lg">
              Click <b>"Claim Now"</b> to get an exclusive discount.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <FaHandPointRight className="text-red-500 text-2xl" />
            <p className="text-lg">You can only claim <b>one coupon at a time</b>.</p>
          </div>
        </div>
      </div>

      {/* Available Coupons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-11/12 md:w-3/4 lg:w-2/3">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold">{coupon.code}</h3>
              <button
                onClick={() => handleClaim(coupon._id)}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition flex items-center space-x-2"
              >
                🎉 <span>Claim Now</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No available coupons at the moment.</p>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div className="mt-6 bg-white text-green-700 text-lg p-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default Home;
