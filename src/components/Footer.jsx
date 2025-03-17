import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
        
        {/* Left Side - Branding */}
        <div className="text-lg font-semibold flex items-center space-x-2">
          🎟️ <span>CouponApp &copy; {new Date().getFullYear()} - All Rights Reserved.</span>
        </div>

        {/* Center - Navigation Links */}

        {/* Right Side - Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-400 transition transform hover:scale-110"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-300 transition transform hover:scale-110"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-400 transition transform hover:scale-110"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-500 transition transform hover:scale-110"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
