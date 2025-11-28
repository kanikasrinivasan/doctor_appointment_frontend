import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/BookAppointment.css";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/doctors"); // token auto-attached
        setDoctors(data);
      } catch (error) {
        console.error("❌ Error fetching doctors:", error.response?.data || error.message);
        if (error.response?.status === 401) handleLogout();
        else alert("❌ Failed to load doctors. Please login again.");
      }
    };
    fetchDoctors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("❌ Session expired. Please login again.");
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) return handleLogout(); // user missing → logout

    const appointmentData = {
      ...form,
      patientId: user._id, // use _id
    };

    try {
      await api.post("/appointments", appointmentData); // token auto-attached
      alert("✅ Appointment booked successfully");
      setForm({ doctorId: "", date: "", time: "", reason: "" });
    } catch (error) {
      console.error("❌ Booking error:", error.response?.data || error.message);
      if (error.response?.status === 401) handleLogout();
      else alert("❌ Booking failed");
    }
  };

  return (
    <div className="book-container">
      <h2>📅 Book Appointment</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <select
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} — {d.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <textarea
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookAppointment;
