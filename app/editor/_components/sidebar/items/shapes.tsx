import { Button } from '@/components/ui/button'
import React from 'react'
import useCanvasStore from '@/store/canvas'

function Shapes() {
  // Get canvas actions from Zustand store
  const { 
    addObject, 
    createRect, 
    createCircle, 
    isCanvasReady 
  } = useCanvasStore();

  // Handler functions
  const handleAddRectangle = () => {
    if (!isCanvasReady) return;
    
    const rect = createRect({
      strokeWidth: 1,
    });
    
    addObject(rect);
  };

  const handleAddCircle = () => {
    if (!isCanvasReady) return;
    
    const circle = createCircle({
      strokeWidth: 1,
    });
    
    addObject(circle);
  };

  const handleAddSquare = () => {
    if (!isCanvasReady) return;
    
    const square = createRect({
      width: 80,
      height: 80,
      strokeWidth: 1,
      rx: 8,
      ry: 8,
    });
    
    addObject(square);
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
        </div>
      </div>
    </div>
  )
}

export default Shapes