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

// ShareButton now moved out of ShareToggleButton for mobile use

type Content = {
  _id: string;
  title: string;
  type: string;
  link: { url: string };
  tags?: { title: string }[];
};

const Dashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [contentList, setContentList] = useState<Content[]>([]);

  if (!user) return <Navigate to="/login" />;

  const fetchContent = async () => {
    try {
      const res = await axios.get("http://localhost:1601/api/content", {
        withCredentials: true,
      });
      setContentList(res.data.contents); // Fix: use `contents` array
    } catch (err) {
      console.error("Failed to fetch content", err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAddSuccess = (newContent: Content) => {
    console.log("New content added:", newContent);
    setContentList((prev) => [newContent, ...prev]);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:1601/api/content/${id}`, {
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
          {contentList.length > 0 ? (
            contentList.map((content) => (
              <Cards
                key={content._id}
                _id={content._id}
                title={content.title}
                type={content.type as any}
                link={content.link}
                tags={content.tags?.map((t) => t.title) || []}
                onDelete={() => handleDelete(content._id)}
                onShare={() => {}}
              />
            ))
          ) : (
            <p className="text-gray-500">No content yet.</p>
          )}
        </div>
      </div>

      {/* Add Content Form */}
      {showAddForm && (
        <AddContentForm
          onClose={() => setShowAddForm(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* Mobile Floating Buttons */}
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
