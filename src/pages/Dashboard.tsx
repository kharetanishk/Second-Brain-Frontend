import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { AddContentForm } from "../components/Add-Content/AddContentForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { AddButton } from "../components/Addbutton";
import axios from "axios";
import { Cards } from "../components/ui/Cards";
import { ShareToggleButton } from "../components/Sharebraintoggle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/content`;

type Content = {
  _id: string;
  title: string;
  type: string;
  link: { url: string };
  tags?: string[];
};

const Dashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [contentList, setContentList] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) return <Navigate to="/" />;

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        withCredentials: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setContentList(res.data.contents);
    } catch (err) {
      console.error("Failed to fetch content", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAddSuccess = (newContent: Content) => {
    setContentList((prev) => [newContent, ...prev]);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      setContentList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="flex h-screen relative overflow-hidden">
      <div className="hidden md:block w-64">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Navbar
          username={user.username}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          onAddContent={() => setShowAddForm(true)}
        />

        <div className="p-4 flex flex-wrap gap-4 justify-start overflow-y-auto">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border shadow-md rounded-xl p-4 w-full max-w-sm min-h-[370px]"
              >
                <Skeleton height={20} width={150} className="mb-4" />
                <Skeleton height={200} className="mb-4" />
                <div className="flex gap-2">
                  <Skeleton height={20} width={60} />
                  <Skeleton height={20} width={50} />
                </div>
              </div>
            ))
          ) : contentList.length > 0 ? (
            contentList.map((content) => (
              <Cards
                key={content._id}
                _id={content._id}
                title={content.title}
                type={content.type as any}
                link={content.link}
                tags={
                  Array.isArray(content.tags)
                    ? content.tags.map((tag) =>
                        typeof tag === "string" ? { _id: tag, title: tag } : tag
                      )
                    : []
                }
                onDelete={() => handleDelete(content._id)}
              />
            ))
          ) : (
            <p className="text-gray-500">No content yet.</p>
          )}
        </div>
      </div>

      {showAddForm && (
        <AddContentForm
          onClose={() => setShowAddForm(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <ShareToggleButton />
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 transition"
        >
          <AddButton size="size-6" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
