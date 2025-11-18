import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorManagement from "./pages/DoctorManagement";
import BookAppointment from "./pages/BookAppointment";
import AppointmentList from "./pages/AppointmentList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<DoctorManagement />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointments" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
}

export default App;
