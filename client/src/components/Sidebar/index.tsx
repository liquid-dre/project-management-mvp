"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Interactive components are client components

import React, { useState } from "react";

const Sidebar = () => {
  // This state determines whether the projects section of the sidebar is open or not
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  // Used to get Projects data & put it in sidebar
  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed top-0 left-0 z-40 flex h-full flex-col bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto ${
    isSidebarCollapsed ? "w-0 opacity-0 hidden" : "w-64"
  }`;

  return (
    <div className={sidebarClassNames}>
      {/* Outer container */}
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3">
          <div className="text-xl font-bold text-gray-800">LayerSync PM</div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500" />
            </button>
          )}
        </div>

        {/* Team */}
        {/* The image must exist in th public directory */}
        <div className="flex items-center gap-4 border-y bg-gray-50 px-6 py-4">
          <Image
            src="/logo.png"
            alt="Team Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              LayerSync Team
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <LockIcon className="h-3 w-3" />
              Private
            </div>
          </div>
        </div>

        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        {/* Sidebar collaped state is going to be stored in global state using redux toolkit */}

        {/* Projects Links */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex items-center justify-between px-8 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          <span>Projects</span>
          {showProjects ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {/* Projects List */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

        {/* Priority Links */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex items-center justify-between px-8 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`group relative flex items-center gap-3 px-8 py-3 transition-colors duration-200 hover:bg-gray-100 ${
          isActive ? "bg-blue-100" : ""
        }`}
      >
        {/* Active Indicator Bar */}
        {isActive && (
          <div className="absolute top-0 left-0 h-full w-1 rounded-r-md bg-blue-500 transition-all duration-300" />
        )}
        <Icon
          className={`h-5 w-5 transition duration-200 ${
            isActive
              ? "text-blue-600"
              : "text-gray-500 group-hover:text-blue-500"
          }`}
        />
        <span
          className={`text-sm font-medium transition-colors duration-200 ${
            isActive
              ? "text-blue-800"
              : "text-gray-800 group-hover:text-blue-600"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
