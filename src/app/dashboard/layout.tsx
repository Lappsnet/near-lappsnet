// app/dashboard/layout.tsx
"use client";
import "@near-wallet-selector/modal-ui/styles.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Sun,
  Moon,
  Plus,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Import Wallet Selector Modules
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";

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
  // State Variables
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);

  // Wallet State
  // eslint-disable-next-line no-unused-vars
  const [selector, setSelector] = useState<any>(null);
  const [modal, setModal] = useState<any>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  // Initialize Wallet Selector on Component Mount
  useEffect(() => {
    async function initWalletSelector() {
      // Setup Wallet Selector with Desired Wallets
      const walletSelector = await setupWalletSelector({
        network: "testnet", // Change to 'testnet' if needed
        modules: [
          setupMyNearWallet(),
          setupMathWallet(),
          setupMeteorWallet(),
          setupLedger(),
          setupCoin98Wallet(),
        ],
      });

      // Setup Modal UI for Wallet Selection
      const modal = setupModal(walletSelector, {
        contractId: "jhonnykro.testnet", // Replace with your NEAR contract ID
      });

      setSelector(walletSelector);
      setModal(modal);
    }

    initWalletSelector();
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  // Toggle Sidebar Menu Items
  const toggleExpand = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Connect Wallet Function
  const connectWallet = async () => {
    if (!modal) {
      console.error("Wallet selector not initialized");
      return;
    }

    try {
      // Show Wallet Selection Modal
      const { account } = await modal.show();

      if (account) {
        setAccountId(account.accountId);
        console.log("Connected account:", account.accountId);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleNavigation = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "dark" : ""
      } text-white`}
    >
      {/* Header */}
      <header className="bg-black dark:bg-black shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Sidebar Toggle Button (Visible on Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <CloseIcon className="h-5 w-5 " />
            ) : (
              <MenuIcon className="h-5 w-5 " />
            )}
          </Button>
          {/* Dashboard Title */}
          <Link
            href="/dashboard"
            className="text-lg sm:text-2xl font-bold "
            onClick={handleNavigation}
          >
            XFY Dashboard
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Connect Wallet Button (Visible en pantallas medianas y grandes) */}
          <div className="hidden sm:flex items-center justify-center w-32 sm:w-64">
            {accountId ? (
              <span className="bg-[#00ED97] text-black px-3 py-1 rounded">
                {`Connected: ${accountId}`}
              </span>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-[#00ED97] text-black hover:bg-green-500 transition-colors"
              >
                Connect wallet
              </Button>
            )}
          </div>
          {/* Other Header Buttons */}
          <Button variant="ghost" size="icon" className="">
            <Search className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className=""
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
          } md:translate-x-0 md:static md:inset-auto w-64 bg-black text-white p-4 transition-transform duration-200 ease-in-out z-50 flex flex-col`}
        >
          <nav className="mt-4 flex-1">
            {menuItems.map((item) => (
              <div key={item.name} className="mb-2">
                {item.subItems ? (
                  // Menu Item with Submenu
                  <>
                    <button
                      className={`flex items-center justify-between w-full p-3 rounded transition-colors ${
                        expandedItems.includes(item.name)
                          ? "bg-[#00ED97] text-black"
                          : "text-white hover:bg-[#00ED97] hover:text-black"
                      }`}
                      onClick={() => toggleExpand(item.name)}
                      data-tooltip-id={`tooltip-${item.name}`}
                      data-tooltip-content={item.description}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </span>
                      {expandedItems.includes(item.name) ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>
                    {/* Tooltip */}
                    <ReactTooltip id={`tooltip-${item.name}`} place="right" />

                    {expandedItems.includes(item.name) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={handleNavigation}
                          >
                            <Button
                              variant="ghost"
                              className="block w-full text-left p-2 rounded hover:bg-[#00ED97] hover:text-[#333333] transition-colors"
                              data-tooltip-id={`tooltip-${subItem.name}`}
                              data-tooltip-content={`Navigate to ${subItem.name}`}
                            >
                              {subItem.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Menu Item without Submenu
                  <Link href={item.href} onClick={handleNavigation}>
                    <Button
                      variant="ghost"
                      className={`flex items-center justify-between w-full p-3 rounded transition-colors hover:bg-[#00ED97] hover:text-black`}
                      data-tooltip-id={`tooltip-${item.name}`}
                      data-tooltip-content={item.description}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </span>
                    </Button>
                  </Link>
                )}
                {/* Tooltip */}
                {!item.subItems && (
                  <ReactTooltip id={`tooltip-${item.name}`} place="right" />
                )}
              </div>
            ))}
          </nav>

          {/* Connect Wallet Button en la Barra Lateral */}
          <div className="mt-auto">
            {/* En Dispositivos Móviles: Mostrar siempre */}
            <div className="flex sm:hidden w-full">
              {accountId ? (
                <span className="bg-[#00ED97] text-black px-3 py-1 rounded w-full text-center">
                  {`Connected: ${accountId}`}
                </span>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="w-full bg-[#00ED97] text-black hover:bg-green-500 transition-colors"
                >
                  Connect wallet
                </Button>
              )}
            </div>
            {/* En Dispositivos de Escritorio: Mostrar solo si conectado */}
            {accountId && (
              <div className="hidden sm:block">
                <span className="bg-[#00ED97] text-black px-3 py-1 rounded w-full text-center">
                  {`Connected: ${accountId}`}
                </span>
              </div>
            )}
          </div>
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
