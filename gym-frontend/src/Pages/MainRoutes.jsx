import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Home";
import Bmi from "./BMI";
import Login from "./Login";
import SignUp from "./SignUp";
import Excercises from "./Excercises";
import VerifyToken from "./VerifyToken";
import Dashboard from "./Dashboard";
import Facilities from "./Facilities";
import Plans from "./Plans";
import ForgotPassword from "./ForgotPassword";

// 🔥 NEW MEMBERSHIP PAGE (User Side)
import Membership from "./Membership";
  // 👈 create this file

// Admin Core
import ProtectedAdminRoute from "../Admin/ProtectedAdminRoute";
import AdminLayout from "../Admin/AdminLayout";
import AdminDashboard from "../Admin/AdminDashboard";

// Admin Management Pages
import MemberManagement from "../Components/management/MemberManagement";
import TrainerManagement from "../Components/management/TrainerManagement";

function Allroutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verifytoken" element={<VerifyToken />} />
      <Route path="/bmi" element={<Bmi />} />
      <Route path="/excercises" element={<Excercises />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ================= USER ROUTES ================= */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 🔥 NEW MEMBERSHIP ROUTE */}
     <Route path="/membership" element={<Membership />} />


      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="members" element={<MemberManagement />} />
        <Route path="trainers" element={<TrainerManagement />} />
      </Route>

    </Routes>
  );
}

export default Allroutes;
