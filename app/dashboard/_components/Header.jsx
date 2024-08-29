"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export const Header = () => {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  });
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={120}
        height={80}
        style={{ width: "auto", height: "auto" }}
      />
      <ul className="hidden md:flex gap-6">
        <a className="gap-6" href="/dashboard">
          {" "}
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == "/dashboard" && "text-primary font-bold"
              }`}
          >
            Dashboard
          </li>
        </a>
        <a className="gap-6" href="https://Learn.internee.pk/">
          {" "}
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == "/dashboard/questions" && "text-primary font-bold"
              }`}
          >
            LMS
          </li>
        </a>
        <a className="gap-6" href="https://portal.internee.pk/">
          {" "}
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == "/dashboard/upgrade" && "text-primary font-bold"
              }`}
          >
            Task Portal
          </li>
        </a>
        <a className="gap-6" href="https://career.internee.pk/">
          {" "}
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == "/dashboard/how" && "text-primary font-bold"
              }`}
          >
            {" "}
            Job Portal
          </li>
        </a>
      </ul>
      <UserButton />
    </div>
  );
};
