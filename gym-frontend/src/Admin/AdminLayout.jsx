import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
