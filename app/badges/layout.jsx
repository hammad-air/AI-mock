import React from "react";
import { Header } from "@/app/dashboard/_components/Header";
import Sidebar  from "@/components/Sidebar"

function DashboardLayout({ children }) {
  return (
    <div>
      <Header /> 

    <div className="">
      <div className=" flex">
      <Sidebar/>
        {children}
        </div>

        </div>
    </div>
  );
}

export default DashboardLayout;