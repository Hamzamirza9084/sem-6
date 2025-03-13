import "./Route.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaUser } from "react-icons/fa";

const roles = [
  { name: "Student", icon: <FaUserGraduate />, path: "/regst" },
  { name: "Faculty", icon: <FaChalkboardTeacher />, path: "/regf" },
  { name: "HOD", icon: <FaUserTie />, path: "/reghod" },
];

function Route() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      const selectedPath = roles.find((role) => role.name === selectedRole)?.path;
      if (selectedPath) navigate(selectedPath);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container-box">
        <h3 className="mb-3">Please select your role</h3>
        <p>Choose your role to proceed further.</p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          {roles.map((role) => (
            <div
              key={role.name}
              className={`role-card ${selectedRole === role.name ? "selected" : ""}`}
              onClick={() => setSelectedRole(role.name)}
            >
              <div className="role-icon">{role.icon}</div>
              <div className="role-text">{role.name}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-custom mt-4" onClick={handleContinue} disabled={!selectedRole}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Route;
