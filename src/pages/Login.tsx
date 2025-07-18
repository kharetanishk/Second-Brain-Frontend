import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1601/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="w-full max-w-md border rounded-2xl shadow-2xl p-8 bg-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center text-blue-700"
        >
          Welcome Back
        </motion.h1>

        {["email", "password"].map((field, i) => (
          <motion.input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded focus:outline-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          />
        ))}

        <AnimatePresence>
          {error && (
            <motion.p
              key="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 mb-3 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleLogin}
          disabled={!formData.email.trim() || !formData.password.trim()}
          whileTap={{ scale: 0.95 }}
          whileHover={
            !formData.email.trim() || !formData.password.trim()
              ? {}
              : {
                  scale: 1.02,
                  boxShadow: "0px 0px 12px rgba(59,130,246,0.6)",
                }
          }
          className={`w-full p-3 rounded-lg font-semibold transition 
    ${
      !formData.email.trim() || !formData.password.trim()
        ? "bg-blue-300 cursor-not-allowed text-black line-through decoration-white"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
