import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../mock/users";
import { useAuth } from "../context/AuthContext";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const userExists = mockUsers.find((user) => user.email === email);
    if (userExists) {
      setError("User already exists!");
      return;
    }

    mockUsers.push({ email, password });

    const success = login(email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="kalam-logo">Kalam</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="register-error">{error}</p>}
          <button type="submit">Register</button>
        </form>
        <p className="register-footer">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;