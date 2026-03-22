import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Manage Members",
      path: "/admin/members",
    },
    {
      name: "Manage Trainers",
      path: "/admin/trainers",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white fixed left-0 top-0 shadow-lg flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        {/* Logo + Back Button */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div className="text-xl font-bold">GymFlow Admin</div>
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white text-lg"
            title="Back to Website"
          >
            ←
          </button>
        </div>

        {/* Admin Email */}
        <div className="px-6 py-4 text-sm text-gray-400 border-b border-gray-700 break-words">
          {adminEmail}
        </div>

        {/* Menu */}
        <div className="mt-6 flex flex-col space-y-2 px-4">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`px-4 py-3 rounded-lg transition duration-200 
                ${
                  location.pathname === item.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button Bottom */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;
