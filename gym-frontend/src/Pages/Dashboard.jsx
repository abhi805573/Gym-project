import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import http from "../configs/http"; 
import TrainerManagement from "../Components/management/TrainerManagement";
import MemberManagement from "../Components/management/MemberManagement";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedMemberData, setEditedMemberData] = useState({
    name: '',
    membershipId: '',
    contact: '',
    feesPaid: false
  });

  const getMembersData = async () => {
    try {
      const response = await http.get(`/api/members`);
      setMembers(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (membershipId) => (event) => {
    event.stopPropagation();
    const memberToDelete = members.find((member) => member.membershipId === membershipId);
    setSelectedMember(memberToDelete);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    getMembersData();
  }, []);

  const handleEdit = (membershipId) => (event) => {
    event.stopPropagation();
    const memberToEdit = members.find((member) => member.membershipId === membershipId);
    setSelectedMember(memberToEdit);
    setEditedMemberData({
      name: memberToEdit.name,
      membershipId: memberToEdit.membershipId,
      contact: memberToEdit.contact,
      feesPaid: memberToEdit.feesPaid
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await http.patch(`Plans/${selectedMember.membershipId}`, {
        name: editedMemberData.name,
        contact: editedMemberData.contact,
        feesPaid: editedMemberData.feesPaid
      });
      console.log("Edit success", response);
      alert("Member updated successfully!");
      getMembersData();
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating member:", err);
      alert("Failed to update member: " + (err.response?.data?.message || err.message));
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await http.delete(`/api/members/${selectedMember.membershipId}`);
      console.log("Delete success", response);
      getMembersData();
      setShowDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedMember(null);
    setEditedMemberData({
      name: '',
      membershipId: '',
      contact: '',
      feesPaid: false
    });
  };

  return (
    <div>
      <Navbar />
      <h1 className='m-8 text-center text-black font-bold text-3xl'>Admin Dashboard</h1>
      <div className='m-8'>
        <h2 className='text-2xl font-bold mb-4'>Manage Members</h2>
        <MemberManagement /> {/* Use only the MemberManagement component */}
      </div>
      <div className='m-8'>
        <h2 className='text-2xl font-bold mb-4'>Manage Trainers</h2>
        <TrainerManagement />
      </div>

      {showEditModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 max-w-2xl mx-auto rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Member</h2>
            <form className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={editedMemberData.name}
                  onChange={(e) => setEditedMemberData({ ...editedMemberData, name: e.target.value })}
                  className="w-full py-2 px-3 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="membershipId" className="text-sm">Membership ID:</label>
                <input
                  id="membershipId"
                  type="text"
                  value={editedMemberData.membershipId}
                  onChange={(e) => setEditedMemberData({ ...editedMemberData, membershipId: e.target.value })}
                  className="w-full py-2 px-3 mt-1 border border-gray-300 rounded-md"
                  required
                  disabled={!!selectedMember}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact" className="text-sm">Contact (Phone):</label>
                <input
                  id="contact"
                  type="tel"
                  value={editedMemberData.contact}
                  onChange={(e) => setEditedMemberData({ ...editedMemberData, contact: e.target.value })}
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit phone number"
                  className="w-full py-2 px-3 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="feesPaid" className="text-sm">Fees Paid:</label>
                <select
                  id="feesPaid"
                  value={editedMemberData.feesPaid}
                  onChange={(e) => setEditedMemberData({ ...editedMemberData, feesPaid: e.target.value === 'true' })}
                  className="w-full py-2 px-3 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Member</h2>
            <p className="mb-4">Are you sure you want to delete {selectedMember.name}?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;