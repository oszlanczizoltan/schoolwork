import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
      <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />} />
      <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;