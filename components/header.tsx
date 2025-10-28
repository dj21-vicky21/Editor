'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDownIcon, FileIcon, FolderOpenIcon, DownloadIcon } from 'lucide-react';

export default function Header() {
  const [inputValue, setInputValue] = useState('');

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header */}
      <div className="h-16 flex items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Logo & File Dropdown */}
        <div className="flex items-center space-x-4 shrink-0">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">CE</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Canvas Editor</span>
            <span className="font-semibold text-lg sm:hidden"></span>
          </div>

          {/* File Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <FileIcon className="h-4 w-4" />
                <span className="hidden sm:inline">File</span>
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <FileIcon className="h-4 w-4 mr-2" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpenIcon className="h-4 w-4 mr-2" />
                Open
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center: Title Input */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            value={inputValue}
            id="title-input"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Untitled"
            className="max-w-[150px] sm:max-w-[200px] h-8 px-3 py-1 bg-transparent text-sm outline-none border border-transparent rounded-md hover:border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-muted-foreground truncate"
          />
        </div>

        {/* Right: Download Button */}
        <div className="shrink-0 ml-auto">
          <Button size="sm">
            <DownloadIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
