import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import http from "../configs/http";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [userRes, memberRes, trainerRes] = await Promise.all([
        http.get("/api/users"),
        http.get("/api/members"),
        http.get("/api/trainers"),
      ]);

      setUsers(userRes.data || []);
      setMembers(memberRes.data || []);
      setTrainers(trainerRes.data || []);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">

        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Logged in as: <span className="font-semibold">{adminEmail}</span>
        </p>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* TOTAL USERS */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-4xl font-bold text-blue-600 mt-3">
                {users.length}
              </p>
            </div>

            {/* TOTAL MEMBERS */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Members
              </h2>
              <p className="text-4xl font-bold text-green-600 mt-3">
                {members.length}
              </p>
            </div>

            {/* TOTAL TRAINERS */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Trainers
              </h2>
              <p className="text-4xl font-bold text-purple-600 mt-3">
                {trainers.length}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
