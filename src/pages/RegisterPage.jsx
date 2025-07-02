// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../mock/users";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const userExists = mockUsers.find((user) => user.email === email);
    if (userExists) {
      alert("User already exists!");
      return;
    }

    mockUsers.push({ email, password });

    const success = login(email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <button type="submit" style={{ width: "100%" }}>Register</button>
    </form>
  );
};

export default RegisterPage;