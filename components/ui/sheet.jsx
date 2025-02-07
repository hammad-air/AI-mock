import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Sheet({ children, open, onClose, position = "right" }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const positionClasses = {
    right: "right-0 top-0 h-full w-80",
    left: "left-0 top-0 h-full w-80",
    top: "top-0 left-0 w-full h-60",
    bottom: "bottom-0 left-0 w-full h-60",
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`fixed bg-white shadow-xl p-4 ${positionClasses[position]}`}
            initial={{ x: position === "right" ? "100%" : position === "left" ? "-100%" : 0, y: position === "top" ? "-100%" : position === "bottom" ? "100%" : 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: position === "right" ? "100%" : position === "left" ? "-100%" : 0, y: position === "top" ? "-100%" : position === "bottom" ? "100%" : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button className="absolute top-2 right-2" onClick={onClose}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
