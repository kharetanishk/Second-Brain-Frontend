import { motion } from "framer-motion";
import brainLogo from "../assets/brain-logo.png";
import brainFeature from "../assets/brain app.jpg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-white overflow-x-hidden">
      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full px-2 sm:px-10 py-4 flex justify-between items-center border-b border-blue-300"
      >
        <div className="flex items-center md:gap-2">
          <motion.img
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            src={brainLogo}
            alt="Second Brain Logo"
            className="w-[40px] md:w-[70px]"
          />
          <h1 className="text-xl md:text-2xl font-bold text-blue-700 tracking-wide">
            Second Brain
          </h1>
        </div>
        <div className="flex gap-1 md:gap-4">
          <Link
            to="/login"
            className="text-blue-600 text-base md:text-2xl hover:bg-blue-100 px-4 py-2 rounded-xl transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-base md:text-2xl hover:bg-blue-800 text-white px-4 py-2 rounded-xl transition font-medium"
          >
            Sign Up
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="px-4 sm:px-10 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl mx-auto gap-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Your Digital Brain,{" "}
            <span className="text-blue-600">Organized.</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Collect YouTube, tweets, videos, notes, images, PDFs and ideas in
            one place. Built for learners, creators, and curious minds like you.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="flex gap-4"
          >
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
            >
              Start Now
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          <motion.img
            src={brainFeature}
            alt="Second Brain App"
            className="w-[90%] md:w-[80%] rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
