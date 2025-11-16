import React from 'react'
import useCanvasStore from '@/store/canvas'
import { cn } from '@/lib/utils';

function Shapes() {
  // Get canvas actions from Zustand store
  const { 
    addObject, 
    createRect, 
    createCircle, 
    isCanvasReady,
    createTriangle,
  } = useCanvasStore();

  // Handler functions
  const handleAddRectangle = () => {
    if (!isCanvasReady) return;
    
    const rect = createRect({
        strokeWidth: 2,
        stroke: '#000',
        fill: 'transparent',
    });
    
    addObject(rect);
  };

  const handleAddCircle = () => {
    if (!isCanvasReady) return;
    
    const circle = createCircle({
        strokeWidth: 2,
        stroke: '#000',
        fill: 'transparent',
    });
    
    addObject(circle);
  };

  const handleAddSquare = () => {
    if (!isCanvasReady) return;
    
    const square = createRect({
      width: 80,
      height: 80,
      strokeWidth: 2,
      stroke: '#000',
      fill: 'transparent',
    });
    
    addObject(square);
  };

  const handleAddTriangle = () => {
    if (!isCanvasReady) return;
    
    const triangle = createTriangle({
      strokeWidth: 2,
      stroke: '#000',
      fill: 'transparent',
    });
    
    addObject(triangle);
  };

  return (
    <div className="p-4 py-3">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => handleAddRectangle()}
            className="aspect-square rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50"
            disabled={!isCanvasReady}
            title="Rectangle"
          >
            <div className="w-16 h-12 border-2 border-white"></div>
          </button>
          
          <button 
            onClick={() => handleAddSquare()}
            className="aspect-square rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50"
            disabled={!isCanvasReady}
            title="Square"
          >
            <div className="w-12 h-12 border-2 border-white"></div>
          </button>
          
          <button 
            onClick={() => handleAddCircle()}
            className="aspect-square rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50"
            disabled={!isCanvasReady}
            title="Circle"
          >
            <div className="w-12 h-12 border-2 border-white rounded-full"></div>
          </button>

          <button 
            onClick={() => handleAddTriangle()}
            className="relative aspect-square rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50"
            disabled={!isCanvasReady}
            title="Triangle"
          >
            <div className={cn("w-0 h-0 border-l-35 border-l-transparent border-b-60 border-b-white border-r-35 border-r-transparent flex items-center justify-center",
                "before:content-[''] before:absolute before:top-[17px] before:left-[11px] before:w-0 before:h-0 before:border-l-33 before:border-l-transparent before:border-b-55 before:border-b-system-secondary-hover-black-color before:border-r-33 before:border-r-transparent"
            )}>
                    </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shapes