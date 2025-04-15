import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return <button className="logout-button" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;