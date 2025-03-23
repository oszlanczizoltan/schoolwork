import React from "react";
import useAuth from "../hooks/useAuth";
import ProductManagement from "../components/Admin/ProductManagement";
import OrderManagement from "../components/Admin/OrderManagement";
import AdminNav from "../components/Admin/AdminNav";

const Admin: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <p>Please log in as an admin.</p>;

  return (
    <div>
      <AdminNav />
      <h1>Admin Dashboard</h1>
      <ProductManagement />
      <OrderManagement />
    </div>
  );
};

export default Admin;
