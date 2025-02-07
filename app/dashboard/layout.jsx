import React from "react";
import { Header } from "./_components/Header";
import Sidebar from "@/components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div>
     
      <Header /> 
      <div className="flex">
      <Sidebar/>
      
     
      <div className="mx-5 md:mx-20 lg:,mx:36 w-full">{children}</div>
      </div>
      
    </div>
  );
}

export default DashboardLayout;
