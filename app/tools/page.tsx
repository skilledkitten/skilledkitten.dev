"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { ToolsGrid } from '../../components/tools/tools-grid';

export default function ToolsPage() {
  const [activeSection, setActiveSection] = useState("tools");
  const [isPastelGenOpen, setIsPastelGenOpen] = useState(false);
  const router = useRouter();

  function handleNavigate(section: string) {
    router.push(`/${section}`);
  }

  function openPastelGen() {
    setIsPastelGenOpen(true);
  }

  function closePastelGen() {
    setIsPastelGenOpen(false);
  }

  return (
    <>
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />
      <div className={`min-h-screen pt-20 ${isPastelGenOpen ? "blur-sm" : ""}`}>
        <button
          onClick={openPastelGen}
          className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Pastel Generator
        </button>
        <ToolsGrid />
      </div>
      {isPastelGenOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-96">
            <button
              onClick={closePastelGen}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Pastel Color Generator</h2>
            {/* Pastel color generator content goes here */}
          </div>
        </div>
      )}
    </>
  );
}
