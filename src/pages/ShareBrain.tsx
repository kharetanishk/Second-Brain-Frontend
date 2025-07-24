import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Cards } from "../components/ui/Cards";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Fallback } from "../components/Fallback";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { ShareBrainResponse } from "../interface/Sharebrainresponse";
const API_URL = `${import.meta.env.VITE_API_URL}/api/brain`;

interface Content {
  _id: string;
  title: string;
  type: string;
  link: { url: string };
  tags?: { _id: string; title: string }[];
}

const ShareBrain = () => {
  const { hash } = useParams();
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBrain = async () => {
      try {
        const res = await axios.get<ShareBrainResponse>(`${API_URL}/${hash}`);
        setUsername(res.data.username);
        setContents(res.data.contents);
      } catch (err: any) {
        console.error("Error fetching shared brain:", err);
        setError(err.response?.data?.message || "Failed to load shared brain");
      } finally {
        setLoading(false);
      }
    };

    if (hash) fetchBrain();
  }, [hash]);

  if (loading) {
    return (
      <div className="flex h-screen relative overflow-hidden">
        <div className="hidden md:block w-64">
          <Sidebar isOpen={true} onClose={() => {}} readOnly />
        </div>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          readOnly
        />

        <div className="flex-1 flex flex-col">
          <Navbar
            username="..."
            onToggleSidebar={() => setIsSidebarOpen(true)}
            onAddContent={() => {}}
            readOnly
          />

          <div className="p-4 flex flex-wrap gap-4 justify-start overflow-y-auto">
            {Array.from({ length: 6 }).map((_, idx) => (
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
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <Fallback message={error} />;

  return (
    <motion.div
      className="flex h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hidden md:block w-64">
        <Sidebar isOpen={true} onClose={() => {}} readOnly />
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        readOnly
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          username={username}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          onAddContent={() => {}}
          readOnly
        />

        <motion.div
          className="flex justify-center items-center p-1.5 mt-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="md:text-lg text-sm text-blue-600 font-bold">
            {`Brain of ${username}`}
          </h1>
        </motion.div>

        <div className="p-4 flex flex-wrap gap-4 justify-start overflow-y-auto">
          {contents.length > 0 ? (
            contents.map((content) => (
              <Cards
                key={content._id}
                _id={content._id}
                title={content.title}
                type={content.type as any}
                link={content.link}
                tags={content.tags || []}
                readOnly
              />
            ))
          ) : (
            <p className="text-gray-500">No content available to show.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ShareBrain;
