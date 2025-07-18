import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
    </div>
  );
};

export default Dashboard;
