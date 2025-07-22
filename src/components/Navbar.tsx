import brainLogo from "../assets/brain-logo.png";
import { motion } from "framer-motion";
import { AddButton } from "./Addbutton";
import { Menu } from "./Menu";
import { ShareToggleButton } from "./Sharebraintoggle";

interface NavbarProps {
  username: string;
  onToggleSidebar: () => void;
  onAddContent: () => void;
  readOnly?: boolean;
}

export const Navbar = ({
  username,
  onToggleSidebar,
  onAddContent,
  readOnly = false,
}: NavbarProps) => {
  return (
    <div className="flex justify-between items-center w-full p-2 border-b shadow-sm bg-white">
      <div className="flex items-center md:gap-2 gap-1">
        <button
          className="block cursor-pointer md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu />
        </button>

        <motion.img
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
          src={brainLogo}
          alt="Second Brain Logo"
          className="w-[40px] md:w-[60px]"
        />
        <h1 className="md:text-xl text-sm font-bold text-blue-700 tracking-wide">
          Second Brain
        </h1>
      </div>

      {!readOnly && (
        <div className="hidden md:flex items-center gap-4 p-1.5">
          <span className="hidden md:block cursor-pointer">
            <ShareToggleButton />
          </span>
          <span
            onClick={onAddContent}
            className="bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer"
          >
            <AddButton size="size-8" />
          </span>
          <motion.p
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-sm text-gray-600"
          >
            Hi! {username}
          </motion.p>
        </div>
      )}

      {!readOnly && (
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="md:hidden"
        >
          <motion.p
            initial={{
              y: -100,
              x: 100,
              opacity: 0,
              scale: 0.5,
              rotate: -30,
            }}
            animate={{
              y: 0,
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "spring",
              stiffness: 70,
              delay: 0.3,
            }}
            className="text-[10px] text-gray-600"
          >
            Hi! {username}
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};
