import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => (
  <div className="dashboard-container">
    <h1>🏥 Doctor Appointment Dashboard</h1>
    <div className="menu-grid">
      <Link to="/doctors" className="menu-card">👩‍⚕️ Doctor Management</Link>
      <Link to="/book-appointment" className="menu-card">📅 Book Appointment</Link>
      <Link to="/appointments" className="menu-card">📋 My Appointments</Link>
    
    </div>
  </div>
);

export default Dashboard;
