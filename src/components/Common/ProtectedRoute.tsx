import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;