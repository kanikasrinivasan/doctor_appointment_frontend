import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";


import "./DoctorManagement.css";

function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    availableDays: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/doctors");  // FIXED: use GET instead of POST
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ Add Doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/doctors",
        {
          ...form,
          availableDays: form.availableDays.split(",").map((d) => d.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Doctor added successfully!");
      setForm({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        availableDays: "",
      });

      fetchDoctors(); // refresh after adding
    } catch (error) {
      console.error("❌ Failed to add doctor:", error);
      setMessage("❌ Failed: " + error.response?.data?.message);
    }
  };

  // ❌ DELETE DOCTOR
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("🗑 Doctor deleted successfully!");
      fetchDoctors(); // refresh list
    } catch (error) {
      console.error("❌ Delete failed:", error);
      setMessage("❌ Failed to delete doctor.");
    }
  };

  return (
    <div className="doctor-management">
      <h2>Doctor Management</h2>

      <form onSubmit={handleAddDoctor}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="Available Days (Mon, Wed, Fri)"
          value={form.availableDays}
          onChange={(e) =>
            setForm({ ...form, availableDays: e.target.value })
          }
        />

        <button type="submit">Add Doctor</button>
      </form>

      <p>{message}</p>

      <h3>Available Doctors</h3>

      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            {doc.name} — {doc.specialization} ({doc.experience} yrs)
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(doc._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorManagement;
