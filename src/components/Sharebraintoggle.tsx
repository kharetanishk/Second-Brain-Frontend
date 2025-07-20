import { useState } from "react";
import axios from "axios";
import { ShareButton } from "./Sharebrainbutton";
import { Copy } from "./Copybutton";
import { Eye } from "./Eye";
import { Close } from "./Close";
import { motion, AnimatePresence } from "framer-motion";

export const ShareToggleButton = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleToggle = async () => {
    try {
      const newShareStatus = !isSharing;
      const response = await axios.post(
        "http://localhost:1601/api/brain/share",
        { share: newShareStatus },
        { withCredentials: true }
      );

      setIsSharing(newShareStatus);

      if (response.data.shareLink) {
        setShareLink(response.data.shareLink);
        setError("");
        setShowPopup(true);
      } else {
        setShareLink("");
      }
    } catch (err: any) {
      console.error("Error toggling share:", err);
      setError(err.response?.data?.message || "Something went wrong");
      setShareLink("");
      setShowPopup(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleViewLink = () => {
    if (shareLink) setShowPopup(true);
  };

  return (
    <div className="flex gap-2 items-center w-full justify-center md:justify-start">
      {/* Share button */}
      <button
        onClick={handleToggle}
        className="py-1 text-sm font-medium transition flex cursor-pointer items-center justify-center md:text-white text-white md:px-4 md:py-2 p-2 rounded-full shadow-lg"
      >
        <span className="md:hidden rounded-full">
          {isSharing ? (
            <div className="bg-red-500 p-2 rounded-full">
              <Close size="size-5" />
            </div>
          ) : (
            <div className="bg-blue-600 p-2 rounded-full">
              <ShareButton size="size-5" />
            </div>
          )}
        </span>

        <span className="hidden md:inline text-base">
          {isSharing ? (
            <div className="bg-red-500 py-2.5 px-2 rounded-full">
              <p>Stop Sharing</p>
            </div>
          ) : (
            <div className="bg-blue-600 py-2.5 px-2.5 rounded-full">
              <p>Share your brain</p>
            </div>
          )}
        </span>
      </button>

      <div>
        <button
          onClick={handleViewLink}
          className={`md:flex text-blue-600 border-3 hover:text-blue-800 transition p-2 rounded-full ${
            !shareLink ? "opacity-40 cursor-not-allowed" : ""
          }`}
          title="View your shared brain link"
          disabled={!shareLink}
        >
          <span>
            <Eye size="size-4" />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-white/10 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-2xl text-center relative"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>

              {error ? (
                <p className="text-red-600 text-sm">{error}</p>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-2">
                    ✅ Brain Shared!
                  </h2>
                  <p className="text-sm text-gray-700 mb-2">
                    Here is your link:
                  </p>

                  <div className="flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md flex-wrap">
                    <a
                      href={shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all text-sm"
                    >
                      {shareLink}
                    </a>

                    <button
                      onClick={handleCopy}
                      title="Copy link"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      <Copy size="size-5" />
                    </button>
                  </div>

                  {copied && (
                    <p className="text-green-600 text-xs mt-1">
                      Copied to clipboard!
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
