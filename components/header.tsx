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

  const handleDownload = () => {
    console.log('Downloading...');
  }
  return (
    <header className="w-full bg-system-primary-black-color sticky top-0 z-50">
      {/* Main Header */}
      <div className="h-16 flex items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Logo & File Dropdown */}
        <div className="flex items-center space-x-4 shrink-0">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-system-secondary-hover-black-color rounded-md flex items-center justify-center">
              <span className="text-system-text-color font-bold text-sm">CE</span>
            </div>
            <span className="text- font-semibold text-lg hidden sm:block">Canvas Editor</span>
            <span className="text-system-text-color font-semibold text-lg sm:hidden"></span>
          </div>

          {/* File Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-system-secondary-hover-black-color hover:bg-transparent text-system-text-color hover:text-system-text-color">
              <Button size="sm" className="flex items-center space-x-1">
                <FileIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">File</span>
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-system-secondary-hover-black-color border-none">
              <DropdownMenuItem className='focus:bg-system-primary-black-color text-system-text-color!'>
                <FileIcon className="h-4 w-4 mr-2 text-system-text-color!" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem className='focus:bg-system-primary-black-color text-system-text-color!'>
                <FolderOpenIcon className="h-4 w-4 mr-2 text-system-text-color!" />
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
            className="max-w-[150px] sm:max-w-[200px] h-8 px-3 py-1 bg-transparent text-sm outline-none border border-transparent rounded-md hover:border-system-secondary-hover-black-color focus:border-system-secondary-hover-black-color focus:ring-1 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-muted-foreground truncate text-system-text-color"
          />
        </div>

        {/* Right: Download Button */}
        <div className="shrink-0 ml-auto">
          <Button size="sm" onClick={handleDownload} className="bg-system-secondary-hover-black-color hover:bg-system-secondary-active-black-color text-system-text-color hover:text-system-text-color">
            <DownloadIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
