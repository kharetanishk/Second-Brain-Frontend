import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Close } from "./Close";
import { LogoutButton } from "./Logout";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  readOnly?: boolean; // 👈 added
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as Variants;

const sidebarVariants: Variants = {
  hidden: { x: -300, opacity: 0, scale: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

export const Sidebar = ({
  isOpen,
  onClose,
  readOnly = false,
}: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          />

          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-br from-blue-50 to-blue-200 shadow-2xl border-r border-white/30 z-40 p-4 backdrop-blur-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-bold text-blue-700">
                app/brain/v1.0.0
              </h1>
              <button onClick={onClose} className="md:hidden">
                <Close size="size-6" />
              </button>
            </div>

            {!readOnly && (
              <ul className="space-y-4 text-blue-900 font-semibold">
                <li className="hover:text-purple-700 transition">
                  <LogoutButton />
                </li>
                <li className="hover:text-purple-700 transition">Content</li>
                <li className="hover:text-purple-700 transition">Settings</li>
              </ul>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
