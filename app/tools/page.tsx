"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import { NavBar } from "@/components/navbar";
import { ToolsGrid } from '../../components/tools/tools-grid';
import { ColorGenerator } from '../../components/tools/color-generator';

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
        <ToolsGrid onToolClick={openPastelGen} />
      </div>
      {isPastelGenOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="relative bg-white rounded-lg shadow-xl p-8 w-[800px] h-[600px] overflow-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closePastelGen();
              }}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-[60]"
            >
              <X size={20} />
            </button>
            <ColorGenerator isActive={true} onExpand={() => {}} />
          </div>
        </div>
      )}
    </>
  );
}
