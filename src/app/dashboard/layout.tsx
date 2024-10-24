// app/dashboard/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  Settings,
  Sun,
  Moon,
  Plus,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

type MenuItem = {
  name: string;
  href: string;
  subItems: { name: string; href: string }[];
  icon: React.ReactNode;
  description: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    subItems: [
      { name: "Overview", href: "/dashboard" },
      { name: "Analytics", href: "/dashboard/analytics" },
    ],
    icon: <ChevronRight className="h-5 w-5" />,
    description: "Main dashboard overview",
  },
  {
    name: "Loan Management",
    href: "/dashboard/loan-management",
    subItems: [
      { name: "View Loans", href: "/dashboard/loan-management/view" },
      { name: "Create Loan", href: "/dashboard/loan-management/create" },
      { name: "Loan Details", href: "/dashboard/loan-management/details" },
    ],
    icon: <Plus className="h-5 w-5" />,
    description: "Manage all loan-related activities",
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div
      className={`flex flex-col h-screen ${isDarkMode ? "dark text-white" : ""}`}
    >
      {/* Header */}
      <header className="bg-black dark:bg-black shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <CloseIcon className="h-5 w-5 text-00ED97" />
            ) : (
              <MenuIcon className="h-5 w-5 text-00ED97" />
            )}
          </Button>
          <Link
            href="/dashboard"
            className="text-lg sm:text-2xl font-bold text-00ED97"
          >
            XFY Dashboard
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="hidden sm:flex items-center justify-center w-32 sm:w-64 bg-[#00ED97] text-black hover:bg-green-500 transition-colors">
            Action
          </Button>
          <Button variant="ghost" size="icon" className="text-00ED97">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-00ED97">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-00ED97">
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-00ED97"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:inset-auto w-64 bg-black text-00ED97 p-4 transition-transform duration-200 ease-in-out z-50`}
        >
          <nav className="mt-4">
            {menuItems.map((item) => (
              <div key={item.name} className="mb-2">
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center justify-between w-full p-3 rounded hover:bg-[#00ED97] hover:text-[#000] transition-colors`}
                    onClick={() => toggleExpand(item.name)}
                    data-tooltip-id={`tooltip-${item.name}`}
                    data-tooltip-content={item.description}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-3 hidden md:block">{item.name}</span>
                    </span>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                </Link>
                {/* Tooltip */}
                <ReactTooltip id={`tooltip-${item.name}`} place="right" />

                {expandedItems.includes(item.name) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.name} href={subItem.href}>
                        <Button
                          variant="ghost"
                          className={`block w-full text-left p-2 rounded hover:bg-[#00ED97] hover:text-[#333333] transition-colors`}
                          data-tooltip-id={`tooltip-${subItem.name}`}
                          data-tooltip-content={`Navigate to ${subItem.name}`}
                        >
                          {subItem.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Overlay for Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-black dark:bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
