import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Hide navbar on login/signup
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="navbar">
      <h2>Doctor Appointment System</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointments">Appointments</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
