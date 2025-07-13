"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

// Kinda like a container for every page where we have sidear always present, navbar always present & page content in the middle
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-950">
      {/* Sidebar */}
      <Sidebar />
      {/* This main is the  right side of the screen i.e Navbar on top and the content under it*/}
      <main
        className={`flex w-full flex-col bg-gray-50 text-gray-950
           ${isSidebarCollapsed ? "" : "md:pl-64"} `}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

// Connect Redux to next js
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
