import React, { useState, useEffect } from "react";
import http from "../../configs/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainers, setTrainers] = useState([]);

  // ✅ Load once
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, trainersRes] = await Promise.all([
        http.get("/api/members"),
        http.get("/api/trainers"),
      ]);

      setMembers(membersRes.data);
      setTrainers(trainersRes.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleDelete = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    try {
      await http.delete(
        `/api/members/delete-member/${selectedMember.membershipId}`
      );

      toast.success("Member deleted successfully ✅");
      closeModal();
      refreshData();
    } catch (error) {
      toast.error("Error deleting member");
    }
  };

  const MemberForm = ({ member }) => {
    const [name, setName] = useState(member?.name || "");
    const [membershipId, setMembershipId] = useState(
      member?.membershipId || ""
    );
    const [contact, setContact] = useState(member?.contact || "");
    const [feesPaid, setFeesPaid] = useState(member?.feesPaid || false);
    const [joiningDate, setJoiningDate] = useState(
      member?.joiningDate?.split("T")[0] || ""
    );
    const [endingDate, setEndingDate] = useState(
      member?.endingDate?.split("T")[0] || ""
    );
    const [startTime, setStartTime] = useState(member?.startTime || "");
    const [endTime, setEndTime] = useState(member?.endTime || "");
    const [weight, setWeight] = useState(member?.weight || "");
    const [height, setHeight] = useState(member?.height || "");
    const [assignedTrainer, setAssignedTrainer] = useState(
      member?.assignedTrainer?._id || member?.assignedTrainer || "none"
    );

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !membershipId || !contact.match(/^\d{10}$/)) {
        toast.error("Please fill correct details");
        return;
      }

      const memberData = {
        name,
        membershipId,
        contact,
        feesPaid,
        joiningDate,
        endingDate,
        startTime,
        endTime,
        weight,
        height,
        ...(assignedTrainer !== "none" && { assignedTrainer }),
      };

      try {
        if (member?.membershipId) {
          await http.put(
            `/api/members/update-member/${member.membershipId}`,
            memberData
          );
          toast.success("Member Updated ✅");
        } else {
          await http.post("/api/members/add-member", memberData);
          toast.success("Member Added ✅");
        }

        closeModal();
        refreshData();
      } catch (error) {
        toast.error("Error saving member");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Membership ID"
          value={membershipId}
          onChange={(e) => setMembershipId(e.target.value)}
          className="w-full p-3 border rounded-lg"
          disabled={!!member}
          required
        />

        <input
          type="tel"
          placeholder="10-digit Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <div>
          <label className="mr-2">Fees Paid</label>
          <input
            type="checkbox"
            checked={feesPaid}
            onChange={(e) => setFeesPaid(e.target.checked)}
          />
        </div>

        <input
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="date"
          value={endingDate}
          onChange={(e) => setEndingDate(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <select
          value={assignedTrainer}
          onChange={(e) => setAssignedTrainer(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="none">None</option>
          {trainers.map((trainer) => (
            <option key={trainer._id} value={trainer._id}>
              {trainer.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            {member?.membershipId ? "Update" : "Add"} Member
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="p-8">

      <button
        onClick={() => {
          setSelectedMember(null);
          setShowEditModal(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add New Member
      </button>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg text-sm">
          <thead className="bg-gray-100 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Membership ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Assigned Trainer</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.membershipId} className="border-b">
                <td className="px-6 py-4">{member.membershipId}</td>
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.contact}</td>
                <td className="px-6 py-4">
                  {member.assignedTrainer
                    ? trainers.find(
                        (t) =>
                          t._id ===
                          (member.assignedTrainer._id ||
                            member.assignedTrainer)
                      )?.name || "Unknown"
                    : "None"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(member)}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(member)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {members.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No Members Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">
              {selectedMember?.membershipId
                ? "Edit Member"
                : "Add Member"}
            </h3>
            <MemberForm member={selectedMember} />
          </div>
        </div>
      )}

      {showDeleteModal && selectedMember && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Delete Member</h3>
            <p>
              Are you sure you want to delete{" "}
              {selectedMember.name}?
            </p>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>

              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
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

export default MemberManagement;
