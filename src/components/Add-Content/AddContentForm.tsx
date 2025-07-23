// src/components/AddContent/AddContentForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../Close";
import { AddButton } from "../Addbutton";

const API_URL = `${import.meta.env.VITE_API_URL}/api/content`;

interface AddContentFormProps {
  onClose: () => void;
  onSuccess: (newContent: any) => void;
}

const contentTypes = ["youtube", "twitter", "pdf", "article", "image", "video"];

export const AddContentForm = ({ onClose, onSuccess }: AddContentFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    link: "",
    tags: [] as string[],
    tagInput: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    const trimmed = formData.tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmed],
        tagInput: "",
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.type) {
      setError("Please select a content type");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const payload = {
        title: formData.title,
        type: formData.type,
        link: { url: formData.link },
        tags: formData.tags,
      };

      const res = await axios.post(API_URL, payload, {
        withCredentials: true,
      });

      onSuccess(res.data.content);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
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
          className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
        >
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded-full w-16" />
                <div className="h-8 bg-gray-200 rounded-full w-20" />
              </div>
              <div className="flex justify-between mt-4">
                <div className="h-10 w-20 bg-gray-200 rounded" />
                <div className="h-10 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
                Add New Content
              </h2>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full mb-3 border p-2 rounded"
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mb-3 border p-2 rounded text-gray-700"
              >
                <option value="" disabled hidden>
                  Type
                </option>
                {contentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Link"
                className="w-full mb-3 border p-2 rounded"
              />

              <div className="flex items-center gap-2 mb-3">
                <input
                  value={formData.tagInput}
                  onChange={(e) =>
                    setFormData({ ...formData, tagInput: e.target.value })
                  }
                  placeholder="Add tag"
                  className="flex-1 border p-2 rounded"
                />
                <button
                  onClick={handleAddTag}
                  className="bg-blue-600 text-white px-1 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  <AddButton size="size-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-800"
                  >
                    #{tag}
                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          tags: prev.tags.filter((t) => t !== tag),
                        }))
                      }
                      className="ml-1 text-gray-500 hover:text-red-500 font-bold"
                    >
                      <div className="bg-red-500 rounded-full cursor-pointer">
                        <span className="text-white">
                          <Close size="size-3" />
                        </span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <div className="flex justify-between">
                <button
                  onClick={onClose}
                  className="text-gray-500 font-semibold hover:text-red-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  {loading ? "Adding..." : "Add Content"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
