// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome to your dashboard!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;