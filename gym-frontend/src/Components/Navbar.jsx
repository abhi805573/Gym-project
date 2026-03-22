import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({ transparent }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ SAFE LocalStorage Reading
  const isAuth = localStorage.getItem("isAuth") === "true";
  const role = localStorage.getItem("role") || "";
  const isPaymentDone = localStorage.getItem("isPlansDone") === "true";
  const userEmail = localStorage.getItem("userEmail") || "";
  const userName = userEmail ? userEmail.split("@")[0] : "User";

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={
        (transparent
          ? "top-0 absolute z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-4 py-3"
      }
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between">

        {/* 🔹 LOGO */}
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Link
            to="/"
            className={
              (transparent ? "text-white" : "text-gray-800") +
              " text-lg font-bold uppercase"
            }
          >
            GymFlow
          </Link>

          <button
            className="lg:hidden text-xl"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            ☰
          </button>
        </div>

        {/* 🔹 MENU */}
        <div
          className={
            "lg:flex lg:items-center w-full lg:w-auto " +
            (navbarOpen ? "block mt-4" : "hidden")
          }
        >
          <ul className="flex flex-col lg:flex-row lg:ml-auto items-center gap-4">

            <li>
              <Link to="/bmi" className="text-xs font-bold uppercase">
                BMI
              </Link>
            </li>

            <li>
              <Link to="/excercises" className="text-xs font-bold uppercase">
                Exercises
              </Link>
            </li>

            <li>
              <Link to="/facilities" className="text-xs font-bold uppercase">
                Facilities
              </Link>
            </li>

            {/* 🔥 MEMBERSHIP (Only User) */}
            {isAuth && role === "user" && (
              <li>
                <Link
                  to="/membership"
                  className="text-xs font-bold uppercase text-green-600"
                >
                  Membership
                </Link>
              </li>
            )}

            {/* 🔥 ADMIN PANEL */}
            {isAuth && role === "admin" && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="text-xs font-bold uppercase text-red-600"
                >
                  Admin Panel
                </Link>
              </li>
            )}

            {/* 🔹 PLANS FOR USER */}
            {isAuth && role === "user" && !isPaymentDone && (
              <li>
                <Link to="/plans" className="text-xs font-bold uppercase">
                  Plans
                </Link>
              </li>
            )}

            {/* 🔹 LOGIN */}
            {!isAuth && (
              <li>
                <Link to="/login">
                  <button className="bg-pink-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow">
                    Login
                  </button>
                </Link>
              </li>
            )}

            {/* 🔹 PROFILE DROPDOWN */}
            {isAuth && (
              <li className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold cursor-pointer"
                >
                  {userName.charAt(0).toUpperCase()}
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-gray-900 text-white rounded-xl shadow-xl p-6 z-50">
                    
                    <p className="text-sm text-gray-300 text-center mb-3">
                      {userEmail}
                    </p>

                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center text-xl font-bold mb-3">
                        {userName.charAt(0).toUpperCase()}
                      </div>

                      <h2 className="text-lg font-semibold mb-4">
                        Hi, {userName}!
                      </h2>

                      <button
                        onClick={handleLogout}
                        className="w-full bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </li>
            )}

          </ul>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </nav>
  );
}
