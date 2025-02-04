"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Sidebar() {
  return (
    <aside className="h-screen bg-gray-900 text-white flex flex-col w-64 fixed top-0 left-0 p-4 shadow-lg">
      {/* Mobile Menu (Slide-in) */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white w-64">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <SheetClose asChild>
                <Button variant="ghost">
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
            <nav className="flex flex-col space-y-3">
              <SheetClose asChild>
                <Link href="/dashboard" className="p-3 hover:bg-gray-700 rounded">
                  Dashboard
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/interviews" className="p-3 hover:bg-gray-700 rounded">
                  Interviews
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/badges" className="p-3 hover:bg-gray-700 rounded">
                  Badges
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-6">Sidebar</h2>
        <nav className="flex flex-col space-y-3">
          <Link href="/dashboard" className="p-3 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
          <Link href="/interviews" className="p-3 hover:bg-gray-700 rounded">
            Interviews
          </Link>
          <Link href="/badges" className="p-3 hover:bg-gray-700 rounded">
            Badges
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <p className="text-sm text-gray-400">© 2025 Afraz. All rights reserved.</p>
      </div>
    </aside>
  );
}
