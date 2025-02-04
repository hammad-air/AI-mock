import React from "react";
import { Header } from "@/app/dashboard/_components/Header";
import Sidebar  from "@/components/Sidebar"

function DashboardLayout({ children }) {
  return (
    <div>
      <Header /> 
     {/* <Sidebar/> */}
      <div className="mx-5 md:mx-20 lg:,mx:36">{children}</div>
    </div>
  );
}

export default DashboardLayout;