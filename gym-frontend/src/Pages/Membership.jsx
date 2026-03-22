import React, { useState } from "react";
import http from "../configs/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Membership = () => {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail") || "";
  const userName = userEmail ? userEmail.split("@")[0] : "";

  const [formData, setFormData] = useState({
    name: userName,
    membershipId: "MEM" + Date.now(), // Auto ID
    contact: "",
    feesPaid: false,
    joiningDate: "",
    endingDate: "",
    startTime: "",
    endTime: "",
    weight: "",
    height: "",
    assignedTrainer: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.contact.match(/^\d{10}$/)) {
      toast.error("Enter valid 10 digit contact number");
      return;
    }

    try {
      await http.post("/api/members/add-member", formData);
      toast.success("Membership Created Successfully ✅");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error("Failed to create membership");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Gym Membership Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full p-3 border rounded-lg"
            placeholder="Full Name"
            required
          />

          <input
            type="text"
            name="membershipId"
            value={formData.membershipId}
            className="w-full p-3 border rounded-lg bg-gray-200"
            readOnly
          />

          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="10-digit Contact"
            required
          />

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="date"
            name="endingDate"
            value={formData.endingDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <div className="flex gap-4">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div className="flex gap-4">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="feesPaid"
              checked={formData.feesPaid}
              onChange={handleChange}
            />
            <label>Fees Paid</label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Submit Membership
          </button>

        </form>
      </div>
    </div>
  );
};

export default Membership;
