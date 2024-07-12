import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import K2 from "../../assets/k2.png";

const Header = ({ toggleSidebar }) => {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const userId = localStorage.getItem('userId');
    if (userId) {
      // Set userId from localStorage
      fetchBalance(); // Fetch balance initially
    } else {
      // Handle case when userId is not available
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
        
      const response = await axios.get(`http://localhost:8000/wallet/balance`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBalance(response.data.balance); // Update balance state with response.data.balance

    } catch (error) {
      console.error("Error fetching balance:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const togglePopover = () => {
    setShowPopover((prev) => !prev);
  };

  return (
    <div className="bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button className="block sm:hidden text-white" onClick={toggleSidebar}>
            ☰
          </button>

          <h1 className="text-2xl font-bold text-white">PANMITRA</h1>

          <div className="hidden sm:flex items-center space-x-4 text-white">
            <h1 className="text-center">Balance: {balance} Rs.</h1>
          </div>

          <div className="relative">
            <button onClick={togglePopover} className="focus:outline-none">
              <img
                src={K2}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </button>
            {showPopover && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg py-2 z-10">
                <div className="px-4">
                  <Link to="/profile">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden bg-gray-200 h-10">
        {/* Mobile specific content */}
      </div>
    </div>
  );
};

export default Header;
