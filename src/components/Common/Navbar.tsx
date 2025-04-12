import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1>Electronics Shop</h1>
      <div className="nav-buttons">
        <button onClick={() => navigate("/products")}>Products</button>
        <button onClick={() => navigate("/orders")}>Orders</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/cart")}>Cart</button>
      </div>
    </header>
  );
};

export default Navbar;