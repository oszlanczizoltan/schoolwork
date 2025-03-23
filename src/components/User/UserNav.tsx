import React from "react";
import { Link } from "react-router-dom";

const UserNav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/products">Browse GPUs</Link></li>
        <li><Link to="/cart">Shopping Cart</Link></li>
        <li><Link to="/orders">Order History</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default UserNav;
