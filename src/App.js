import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddCoupon from "./pages/AddCoupon";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Import Footer

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {/* Navbar at the Top */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<Admin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-coupon" element={<AddCoupon />} />
            </Routes>
          </div>

          {/* Footer at the Bottom */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
