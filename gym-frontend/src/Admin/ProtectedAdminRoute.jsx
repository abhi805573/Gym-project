import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import AdminStats from "../Components/AdminStats";
import http from "../configs/http";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const memberRes = await http.get("/api/members");
      const trainerRes = await http.get("/api/trainers");

      setMembers(memberRes.data);
      setTrainers(trainerRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      
      <AdminSidebar />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <AdminStats
          totalMembers={members.length}
          totalTrainers={trainers.length}
        />
      </div>

    </div>
  );
};

export default AdminDashboard;
