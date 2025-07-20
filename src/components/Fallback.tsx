import { motion } from "framer-motion";
import { Smile, RefreshCw } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export const Fallback = ({ message = "Oops! Something went wrong..." }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-12"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-blue-600 mb-4"
      >
        <Smile size={48} />
      </motion.div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
        {message}
      </h2>

      <p className="text-gray-500 mb-6 text-sm max-w-md">
        Maybe the server took a coffee break ☕ or your content ran away 🏃‍♂️.
      </p>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <RefreshCw size={18} />
        Try Again
      </button>
    </motion.div>
  );
};
