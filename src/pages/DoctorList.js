import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/admin/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <div className="page-container">
      <h2>Available Doctors</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            <strong>{doc.name}</strong> — {doc.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
