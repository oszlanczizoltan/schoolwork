import React from "react";
import { Link } from "react-router-dom";

const AdminNav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/orders">Manage Orders</Link></li>
        <li><Link to="/dashboard">User Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNav;
