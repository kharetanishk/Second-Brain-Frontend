import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { Fallback } from "../components/Fallback";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
