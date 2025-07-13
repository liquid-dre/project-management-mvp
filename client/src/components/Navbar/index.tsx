import React, { useRef } from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import gsap from "gsap";

// We use (components) so that the route doesn't appear in the url;
// Making an index.tsx instead of page.tsx means the component doesnb't open as new page

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const settingsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(settingsRef.current, {
      rotate: 20,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(settingsRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3">
      {/* Search Bar */}
      <div className="flex items-center gap-8">
        {/* Menu Icon */}
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8" />
          </button>
        )}

        {/* Search box */}
        {/* Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-md border border-gray-200 bg-gray-100 py-2 pr-4 pl-10 text-sm text-gray-700 shadow-sm transition focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Right: Animated Settings */}
      <div className="flex items-center gap-4">
        <Link
          href="/settings"
          className="rounded p-2 transition hover:bg-gray-100"
          aria-label="Settings"
        >
          <div
            ref={settingsRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Settings className="h-6 w-6 text-gray-700" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
