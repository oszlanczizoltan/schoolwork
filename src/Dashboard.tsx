
import { useNavigate } from "react-router-dom";


const Dashboard = ({ userRole }: { userRole: string | null }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      {userRole === "admin" && (
        <button onClick={() => navigate("/admin")}>Go to Admin Panel</button>
      )}
    </div>
  );
};

export default Dashboard;
