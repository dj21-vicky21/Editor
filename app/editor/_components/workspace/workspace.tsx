"use client";

import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import useCanvasStore from "@/store/canvas";
import useSidebarStore from "@/store/sidebar";

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Zustand store
  const {
    backgroundColor,
    setCanvas,
    setCanvasReady,
    setCanvasDimensions,
    saveState,
    setWorkspaceCanvasDimensions,
  } = useCanvasStore();

  // Add this one line:
  const { isOpen } = useSidebarStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize canvas with proper configuration
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor,
      selection: true,
      preserveObjectStacking: true,
      renderOnAddRemove: true,
      controlsAboveOverlay: true,
      allowTouchScrolling: false,
      imageSmoothingEnabled: false,
    });

    // Set canvas in store
    setCanvas(fabricCanvas);
    setCanvasReady(true);

    // Handle window resize - make canvas fill parent completely
    const handleResize = () => {
      if (containerRef.current && fabricCanvas) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        setCanvasDimensions({
          width: containerWidth,
          height: containerHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial resize
    setTimeout(handleResize, 100);

    // Save initial state
    setTimeout(() => saveState(), 200);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      fabricCanvas.dispose();
      setCanvas(null);
      setCanvasReady(false);
    };
  }, [setCanvas, setCanvasReady, setCanvasDimensions, backgroundColor, saveState]);

  // Canvas action handlers
//   const handleAddRect = () => {
//     const rect = createRect();
//     addObject(rect);
//   };

//   const handleAddCircle = () => {
//     const circle = createCircle();
//     addObject(circle);
//   };

//   const handleAddText = () => {
//     const text = createText();
//     addObject(text);
//   };

//   const handleDeleteSelected = () => {
//     removeObjects(selectedObjects);
//   };

//   const handleClearCanvas = () => {
//     clearCanvas();
//   };

//   const handleExport = () => {
//     const jsonData = exportToJSON();
//     if (jsonData) {
//       console.log('Canvas exported:', jsonData);
//       // You can download or copy to clipboard here
//     }
//   };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        console.log("--> ~ Canvas ~ containerWidth:", containerWidth)
        console.log("--> ~ Canvas ~ containerHeight:", containerHeight)
        
        setWorkspaceCanvasDimensions({
          width: containerWidth,
          height: containerHeight
        });

        // setCanvasDimensions({
        //   width: containerWidth,
        //   height: containerHeight
        // });
      }
    }, 320); // Match sidebar transition duration

    return () => clearTimeout(timeoutId);
  }, [isOpen, setCanvasDimensions, setWorkspaceCanvasDimensions]); // Listen to sidebar state

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {/* Toolbar */}
      {/* <div className="flex flex-wrap gap-2 p-4 bg-gray-100 border-b">
        <button 
          onClick={handleAddRect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          disabled={!isCanvasReady}
        >
          Rectangle
        </button>
        <button 
          onClick={handleAddCircle}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
          disabled={!isCanvasReady}
        >
          Circle
        </button>
        <button 
          onClick={handleAddText}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
          disabled={!isCanvasReady}
        >
          Text
        </button>
        <button 
          onClick={handleDeleteSelected}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          disabled={!isCanvasReady || selectedObjects.length === 0}
        >
          Delete
        </button>
        <button 
          onClick={handleClearCanvas}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
          disabled={!isCanvasReady}
        >
          Clear
        </button>
        <div className="w-px h-8 bg-gray-300 mx-2"></div>
        <button 
          onClick={undo}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
          disabled={!canUndo()}
        >
          Undo
        </button>
        <button 
          onClick={redo}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
          disabled={!canRedo()}
        >
          Redo
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors disabled:opacity-50"
          disabled={!isCanvasReady}
        >
          Export
        </button>
      </div> */}

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 bg-gray-50 overflow-hidden"
      >
        <canvas 
          ref={canvasRef}
          className="block max-w-full max-h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Canvas;