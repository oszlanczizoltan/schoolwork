import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Component />;
};

export default ProtectedRoute;