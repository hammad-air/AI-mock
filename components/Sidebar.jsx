"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Sheet from "@/components/ui/sheet";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="p-4">
          <button className="text-white bg-green-500 p-2 rounded" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <Sheet open={isOpen} onClose={() => setIsOpen(false)} position="left">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-4 flex flex-col space-y-3">
                <Link href="/dashboard" className="p-3 hover:bg-gray-700 rounded">Dashboard</Link>
                <Link href="/interviews" className="p-3 hover:bg-gray-700 rounded">Interviews</Link>
                <Link href="/badges" className="p-3 hover:bg-gray-700 rounded">Badges</Link>
              </nav>
            </div>
          </Sheet>
        </div>
      ) : (
        <aside className="h-screen bg-gray-900 text-white flex flex-col w-64  top-0 left-0 p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Sidebar</h2>
          <nav className="flex flex-col space-y-3">
            <Link href="/dashboard" className="p-3 hover:bg-gray-700 rounded">Dashboard</Link>
            <Link href="/interviews" className="p-3 hover:bg-gray-700 rounded">Interviews</Link>
            <Link href="/badges" className="p-3 hover:bg-gray-700 rounded">Badges</Link>
          </nav>
          <div className="mt-auto">
            <p className="text-sm text-gray-400">© 2025 Afraz. All rights reserved.</p>
          </div>
        </aside>
      )}
    </>
  );
}
