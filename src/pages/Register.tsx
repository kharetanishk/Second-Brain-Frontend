import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [formData, setformData] = useState({
    username: "",
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
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { username, email, password } = formData;

    // Frontend validations
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    console.log("handleregisterhit");
    try {
      console.log("datareq");
      const res = await axios.post(
        "http://localhost:1601/api/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("datasend");
      console.log(res.data);
      setUser(res.data.user); //setup the context
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err.res);
      setError(err.response?.data?.message || "Registration failed");
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
          Create your Second Brain
        </motion.h1>

        {/* Staggered Input Fields */}
        {["username", "email", "password"].map((field, i) => (
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

        {/* Error Animation */}
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
          onClick={handleRegister}
          disabled={
            !formData.username.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
          }
          whileTap={{ scale: 0.95 }}
          whileHover={
            !formData.username.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
              ? {}
              : {
                  scale: 1.02,
                  boxShadow: "0px 0px 12px rgba(59,130,246,0.6)",
                }
          }
          className={`w-full p-3 rounded-lg font-semibold transition 
    ${
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
        ? "bg-blue-300 cursor-not-allowed text-black line-through decoration-white"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
        >
          Sign Up
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
