import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import "../styles/AppointmentList.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        alert("❌ You must login again.");
        return;
      }

      const { data } = await api.get(`/appointments/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(data);
    } catch (error) {
      console.error("❌ Fetch appointments error:", error.response?.data || error.message);
      alert("❌ Failed to fetch appointments");
    }
  };

  return (
    <div className="appointment-container">
      <h2>📋 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.doctorId?.name || "Unknown"}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
