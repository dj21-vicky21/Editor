"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LayoutIcon,
  TypeIcon,
  ImageIcon,
  ZapIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Home",
    content: (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-slate-100"
          >
            Recent Projects
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-slate-100"
          >
            Templates
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Settings
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "design",
    icon: <LayoutIcon className="w-5 h-5" />,
    label: "Design",
    content: (
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <LayoutIcon className="w-4 h-4 mr-2" />
            Smart resize
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Background
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <LayoutIcon className="w-4 h-4 mr-2" />
            Browse Templates
          </Button>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">Template 1</span>
            </div>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">Template 2</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "text",
    icon: <TypeIcon className="w-5 h-5" />,
    label: "Text",
    content: (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Add Heading
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Add Body Text
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Font Combinations
          </Button>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Font Styles
          </h4>
          <div className="space-y-2">
            <div className="p-2 bg-gray-700 rounded text-white text-sm">
              Roboto - Regular
            </div>
            <div className="p-2 bg-gray-700 rounded text-white text-sm font-bold">
              Roboto - Bold
            </div>
            <div className="p-2 bg-gray-700 rounded text-white text-sm italic">
              Roboto - Italic
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "media",
    icon: <ImageIcon className="w-5 h-5" />,
    label: "Media",
    content: (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Upload Image
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Stock Photos
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Icons & Shapes
          </Button>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Recent Uploads
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square bg-gray-700 rounded flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-700 rounded flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "animate",
    icon: <ZapIcon className="w-5 h-5" />,
    label: "Animate",
    content: (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Fade In
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Slide In
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Bounce
          </Button>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Animation Properties
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400">Duration</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                className="w-full mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Delay</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                className="w-full mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const togglePanel = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const closePanel = () => {
    setActiveItem(null);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-16 bg-system-primary-black-color flex flex-col items-center py-4 space-y-2">
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
          "bg-system-primary-black-color transition-all duration-300 ease-in-out overflow-hidden pr-2",
          activeItem ? "w-80" : "w-0"
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
