import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-64">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Navbar
          username={user.username}
          onToggleSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Main content goes here */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">Dashboard Content Here</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
