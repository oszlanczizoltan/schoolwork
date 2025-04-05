import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1>Graphics Card shop</h1>
      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/products")}>Products</button>
        <button onClick={() => navigate("/cart")}>Cart</button>
        <button onClick={() => navigate("/orders")}>Orders</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
      </div>
    </header>
  );
};

export default Navbar;