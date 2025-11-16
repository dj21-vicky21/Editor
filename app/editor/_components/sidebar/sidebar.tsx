"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    SquareIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Shapes from "./items/shapes";
import useSidebarStore from "@/store/sidebar"; // ADD THIS LINE

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "shapes",
    icon: <SquareIcon className="w-5 h-5" />,
    label: "Shapes",
    content: <Shapes />,
  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { setIsOpen } = useSidebarStore(); // ADD THIS LINE

  const togglePanel = (itemId: string) => {
    const newActiveItem = activeItem === itemId ? null : itemId;
    setActiveItem(newActiveItem);
    setIsOpen(newActiveItem !== null); // ADD THIS LINE
  };

  const closePanel = () => {
    setActiveItem(null);
    setIsOpen(false); // ADD THIS LINE
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-18 bg-system-primary-black-color flex flex-col items-center py-4 space-y-2">
        {sidebarItems.map((item) => (
          <div key={item.id} className={cn(
            "w-full relative flex flex-col before:content-[''] after:content-['']",
            "before:absolute before:top-0 before:h-2 before:w-full before:rounded-br-sm",
            "after:absolute after:bottom-0 after:h-2 after:w-full after:rounded-tr-sm",
            activeItem === item.id && "before:opacity-100 after:opacity-100 before:bg-system-primary-black-color after:bg-system-primary-black-color after:z-10 before:z-20"
          )}>
                <Button
                key={item.id}
                variant="ghost"
                size="icon"
                onClick={() => togglePanel(item.id)}
                className={cn(
                    "w-full h-18 text-gray-400 hover:text-white hover:bg-transparent transition-all duration-200 relative z-10 rounded-none flex flex-col",
                    activeItem === item.id && " text-white bg-gradient-to-r from-transparent to-system-secondary-hover-black-color"
                )}
                >
                {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                </Button>
           
          </div>
        ))}
      </div>

      {/* Expandable Panel */}
      <div
        className={cn(
          "bg-system-primary-black-color transition-all duration-300 ease-in-out overflow-hidden",
          activeItem ? "w-80 pr-2 pb-2" : "w-0"
        )}
      >
        <div className="bg-system-secondary-hover-black-color h-full rounded-xl">
        {activeItem && (
          <div className=" h-full flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-system-primary-black-color">
              <h2 className="text-lg font-semibold">
                {sidebarItems.find((item) => item.id === activeItem)?.label}
              </h2>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={closePanel}
                className="text-gray-400 hover:text-system-secondary-black-color hover:bg-system-primary-black-color"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto">
              {sidebarItems.find((item) => item.id === activeItem)?.content}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
