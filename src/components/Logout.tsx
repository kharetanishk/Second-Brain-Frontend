import { LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:1601/api/auth/logout",
        {},
        { withCredentials: true }
      );

      toast.success("👋 Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("❌ Something went wrong during logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded transition-all duration-200"
    >
      <LogOut size={18} />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};
