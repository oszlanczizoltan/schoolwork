import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Cart from "./components/User/Cart";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import OrderHistory from "./components/User/OrderHistory";
import OrderManagement from "./components/Admin/OrderManagement";

const RoleBasedOrders = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (user.role === "admin") {
    return <OrderManagement />;
  }

  return <OrderHistory />;
};

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<ProtectedRoute component={RoleBasedOrders} />} />
    </Routes>
  );
};

export default AppRoutes;