import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/Common/ProtectedRoute";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/admin" element={user?.isAdmin ? <Admin /> : <Navigate to="/" />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;