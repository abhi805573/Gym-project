import React, { useState, useEffect } from "react";
import http from "../../configs/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await http.get("/api/trainers");
      setTrainers(res.data || []);
    } catch (error) {
      toast.error("Error fetching trainers");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedTrainer(null);
    setShowFormModal(false);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    try {
      await http.delete(
        `/api/trainers/delete-trainer/${selectedTrainer._id}`
      );
      toast.success("Trainer Deleted ✅");
      closeModal();
      fetchTrainers();
    } catch (error) {
      toast.error("Error deleting trainer");
    }
  };

  // ================= FORM =================
  const TrainerForm = () => {
    const [name, setName] = useState(selectedTrainer?.name || "");
    const [salary, setSalary] = useState(selectedTrainer?.salary || "");
    const [salaryPaid, setSalaryPaid] = useState(
      selectedTrainer?.salaryPaid || false
    );
    const [contact, setContact] = useState(
      selectedTrainer?.contact || ""
    );

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || salary <= 0 || !/^\d{10}$/.test(contact)) {
        toast.error("Enter valid details");
        return;
      }

      const data = { name, salary, salaryPaid, contact };

      try {
        if (selectedTrainer?._id) {
          await http.put(
            `/api/trainers/update-trainer/${selectedTrainer._id}`,
            data
          );
          toast.success("Trainer Updated ✅");
        } else {
          await http.post("/api/trainers/add-trainer", data);
          toast.success("Trainer Added ✅");
        }

        closeModal();
        fetchTrainers();
      } catch (error) {
        toast.error("Error saving trainer");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Trainer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={salaryPaid}
            onChange={(e) => setSalaryPaid(e.target.checked)}
          />
          <label>Salary Paid</label>
        </div>

        <input
          type="tel"
          placeholder="10-digit Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            {selectedTrainer?._id ? "Update" : "Add"} Trainer
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

  // ================= UI =================

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Trainers</h2>

      <button
        onClick={() => {
          setSelectedTrainer(null);
          setShowFormModal(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Trainer
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="border-b">
                  <td className="px-4 py-3">{trainer.name}</td>
                  <td className="px-4 py-3">₹ {trainer.salary}</td>
                  <td className="px-4 py-3">
                    {trainer.salaryPaid ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3">{trainer.contact}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedTrainer(trainer);
                        setShowFormModal(true);
                      }}
                      className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTrainer(trainer);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {trainers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No Trainers Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <TrainerForm />
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <p>
              Delete trainer <b>{selectedTrainer?.name}</b> ?
            </p>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
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

export default TrainerManagement;
