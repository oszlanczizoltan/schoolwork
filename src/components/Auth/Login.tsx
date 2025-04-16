import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const { loginUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Logging in user...");
      await loginUser(email, password);
      console.log("User logged in successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate("/register")}>
          Don't have an account? Sign Up
        </p>
      </div>
    </div>
  )};

export default Login;