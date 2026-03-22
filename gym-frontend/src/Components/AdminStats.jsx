import React from "react";

const AdminStats = ({ totalMembers, totalTrainers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Total Members */}
      <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600">
        <h3 className="text-gray-500 text-sm uppercase">Total Members</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {totalMembers}
        </p>
      </div>

      {/* Total Trainers */}
      <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-600">
        <h3 className="text-gray-500 text-sm uppercase">Total Trainers</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {totalTrainers}
        </p>
      </div>

      {/* Active Status */}
      <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-600">
        <h3 className="text-gray-500 text-sm uppercase">System Status</h3>
        <p className="text-xl font-semibold text-green-600 mt-2">
          Running Smoothly 🚀
        </p>
      </div>

    </div>
  );
};

export default AdminStats;
