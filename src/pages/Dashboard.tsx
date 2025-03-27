import React from "react";
import { useAuth } from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";
import ProductListing from "../components/User/ProductListing";
import Cart from "../components/User/Cart";
import OrderHistory from "../components/User/OrderHistory";
import UserNav from "../components/User/UserNav";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, loading } = useProducts();

  if (!user) return <p>Please log in to access the dashboard.</p>;

  return (
    <div>
      <UserNav />
      <h1>Welcome, {user.email}</h1>
      {loading ? <p>Loading products...</p> : <ProductListing products={products} />}
      <Cart />
      <OrderHistory />
    </div>
  );
};

export default Dashboard;
