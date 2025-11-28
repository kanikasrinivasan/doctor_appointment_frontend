import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/AppointmentList.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?._id) {
        alert("❌ You must login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      // Use API instance; token auto-attached via interceptor
      const { data } = await api.get(`/appointments/user/${user._id}`);
      setAppointments(data);
    } catch (error) {
      console.error(
        "❌ Fetch appointments error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        // Token expired → logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("❌ Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("❌ Failed to fetch appointments");
      }
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
