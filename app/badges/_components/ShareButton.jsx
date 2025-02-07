import { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShareButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="inline-block"
    >
      <Button
        onClick={handleCopy}
        className="flex items-center gap-2 relative px-4 py-2 rounded-lg"
      >
        <Copy className="w-5 h-5" />
        {copied ? "Copied!" : "Share"}
      </Button>
    </motion.div>
  );
}
