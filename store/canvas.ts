import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as fabric from 'fabric';

interface CanvasState {
  // Canvas instance and configuration
  canvas: fabric.Canvas | null;
  isCanvasReady: boolean;
  
  // Canvas dimensions
  canvasDimensions: {
    width: number;
    height: number;
  };

  workspaceCanvasDimensions: {
    width: number;
    height: number;
  };
  
  // Canvas objects and selection
  objects: fabric.FabricObject[];
  selectedObjects: fabric.FabricObject[];
  
  // Canvas settings
  backgroundColor: string;
  zoom: number;
  
  // History for undo/redo
  history: string[];
  historyIndex: number;
  
  // Actions
  setCanvas: (canvas: fabric.Canvas | null) => void;
  setCanvasReady: (ready: boolean) => void;
  setCanvasDimensions: (dimensions: { width: number; height: number }) => void;
  setWorkspaceCanvasDimensions: (dimensions: { width: number; height: number }) => void;
  setObjects: (objects: fabric.FabricObject[]) => void;
  setSelectedObjects: (objects: fabric.FabricObject[]) => void;
  setBackgroundColor: (color: string) => void;
  setZoom: (zoom: number) => void;
  
  // Canvas operations
  addObject: (object: fabric.FabricObject) => void;
  removeObjects: (objects: fabric.FabricObject[]) => void;
  clearCanvas: () => void;
  
  // History operations
  saveState: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Export/Import
  exportToJSON: () => string | null;
  importFromJSON: (jsonData: string) => void;
  
  // Helper functions
  getSmartPosition: (objectWidth?: number, objectHeight?: number) => { left: number; top: number };
  
  // Object creation helpers
  createRect: (options?: Partial<fabric.RectProps>) => fabric.Rect;
  createCircle: (options?: Partial<fabric.CircleProps>) => fabric.Circle;
  createText: (text?: string, options?: Partial<fabric.TextProps>) => fabric.Text;
}

const useCanvasStore = create<CanvasState>()(
  devtools(
    (set, get) => ({
      // Initial state
      canvas: null,
      isCanvasReady: false,
      canvasDimensions: { width: 800, height: 600 },
      objects: [],
      selectedObjects: [],
      backgroundColor: '#ffffff',
      zoom: 1,
      history: [],
      historyIndex: -1,

      // Basic setters
      setCanvas: (canvas) => {
        set({ canvas });
        if (canvas) {
          // Setup canvas event listeners with proper Fabric.js v6 syntax
          canvas.on('object:added', () => {
            const state = get();
            state.setObjects(canvas.getObjects());
            // Don't save state immediately to avoid infinite loops
            setTimeout(() => state.saveState(), 100);
          });

          canvas.on('object:removed', () => {
            const state = get();
            state.setObjects(canvas.getObjects());
            setTimeout(() => state.saveState(), 100);
          });

          canvas.on('selection:created', (e) => {
            const selected = e.selected || [];
            get().setSelectedObjects(selected);
          });

          canvas.on('selection:updated', (e) => {
            const selected = e.selected || [];
            get().setSelectedObjects(selected);
          });

          canvas.on('selection:cleared', () => {
            get().setSelectedObjects([]);
          });
        }
      },

      setCanvasReady: (ready) => set({ isCanvasReady: ready }),
      
      setCanvasDimensions: (dimensions) => {
        set({ canvasDimensions: dimensions });
        const canvas = get().canvas;
        if (canvas) {
          canvas.setDimensions(dimensions);
          canvas.renderAll();
        }
      },
      setWorkspaceCanvasDimensions: (dimensions) => {
        set({ workspaceCanvasDimensions: dimensions });
        // const canvas = get().canvas;
        // if (canvas) {
        //   // canvas.setDimensions(dimensions);
        //   // canvas.renderAll();
        // }
      },

      setObjects: (objects) => set({ objects }),
      setSelectedObjects: (objects) => set({ selectedObjects: objects }),
      
      setBackgroundColor: (color) => {
        set({ backgroundColor: color });
        const canvas = get().canvas;
        if (canvas) {
          canvas.backgroundColor = color;
          canvas.renderAll();
        }
      },

      setZoom: (zoom) => {
        set({ zoom });
        const canvas = get().canvas;
        if (canvas) {
          canvas.setZoom(zoom);
          canvas.renderAll();
        }
      },

      // Canvas operations
      addObject: (object) => {
        const canvas = get().canvas;
        if (canvas) {
          canvas.add(object);
          canvas.setActiveObject(object);
          canvas.renderAll();
        }
      },

      removeObjects: (objects) => {
        const canvas = get().canvas;
        if (canvas && objects.length > 0) {
          objects.forEach(obj => canvas.remove(obj));
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      },

      clearCanvas: () => {
        const canvas = get().canvas;
        if (canvas) {
          canvas.clear();
          canvas.backgroundColor = get().backgroundColor;
          canvas.renderAll();
          set({ objects: [], selectedObjects: [] });
        }
      },

      // History operations
      saveState: () => {
        const canvas = get().canvas;
        if (!canvas) return;

        try {
          const { history, historyIndex } = get();
          const currentState = JSON.stringify(canvas.toJSON());
          
          // Remove any future history if we're not at the end
          const newHistory = history.slice(0, historyIndex + 1);
          newHistory.push(currentState);
          
          // Limit history size
          if (newHistory.length > 50) {
            newHistory.shift();
          }
          
          set({
            history: newHistory,
            historyIndex: newHistory.length - 1
          });
        } catch (error) {
          console.error('Error saving canvas state:', error);
        }
      },

      undo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex <= 0) return;

        try {
          const newIndex = historyIndex - 1;
          const state = history[newIndex];
          
          canvas.loadFromJSON(state, () => {
            canvas.renderAll();
            set({ 
              historyIndex: newIndex,
              objects: canvas.getObjects(),
              selectedObjects: []
            });
          });
        } catch (error) {
          console.error('Error during undo:', error);
        }
      },

      redo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex >= history.length - 1) return;

        try {
          const newIndex = historyIndex + 1;
          const state = history[newIndex];
          
          canvas.loadFromJSON(state, () => {
            canvas.renderAll();
            set({ 
              historyIndex: newIndex,
              objects: canvas.getObjects(),
              selectedObjects: []
            });
          });
        } catch (error) {
          console.error('Error during redo:', error);
        }
      },

      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      // Export/Import
      exportToJSON: () => {
        const canvas = get().canvas;
        if (!canvas) return null;
        
        try {
          return JSON.stringify(canvas.toJSON());
        } catch (error) {
          console.error('Error exporting canvas:', error);
          return null;
        }
      },

      importFromJSON: (jsonData) => {
        const canvas = get().canvas;
        if (!canvas) return;

        try {
          canvas.loadFromJSON(jsonData, () => {
            canvas.renderAll();
            get().setObjects(canvas.getObjects());
            get().saveState();
          });
        } catch (error) {
          console.error('Error importing canvas:', error);
        }
      },

      // Smart positioning helper function
      getSmartPosition: (objectWidth = 100, objectHeight = 80) => {
        const { canvasDimensions, workspaceCanvasDimensions, selectedObjects, canvas } = get();
        
        // If there are selected objects, position relative to the active object
        if (selectedObjects.length > 0 && canvas) {
          const activeObject = canvas.getActiveObject();
          
          if (activeObject) {
            const activeLeft = activeObject.left || 0;
            const activeTop = activeObject.top || 0;
            
            // Get scaled dimensions for proper positioning
            const activeWidth = (activeObject.getScaledWidth?.() || activeObject.width) || 100;
            const activeHeight = (activeObject.getScaledHeight?.() || activeObject.height) || 100;
            
            // Calculate -20% offset positions
            const offsetX = activeWidth * 0.2;
            const offsetY = activeHeight * 0.2;
            
            let newLeft = activeLeft + offsetX;
            let newTop = activeTop + offsetY;
            
            // Ensure the new object doesn't go outside canvas bounds
            newLeft = Math.max(10, Math.min(newLeft, workspaceCanvasDimensions.width - objectWidth - 10));
            newTop = Math.max(10, Math.min(newTop, workspaceCanvasDimensions.height - objectHeight - 10));
            
            return {
              left: newLeft,
              top: newTop
            };
          }
        }

        console.log("POSTION",{
          left: (workspaceCanvasDimensions.width / 2) - (objectWidth / 2),
          top: (workspaceCanvasDimensions.height / 2) - (objectHeight / 2)
        })
        
        // If no active object, place in TRUE center
        return {
          left: (workspaceCanvasDimensions.width / 2) - (objectWidth / 2),
          top: (workspaceCanvasDimensions.height / 2) - (objectHeight / 2)
        };
      },

      // Object creation helpers
      createRect: (options = {}) => {
        const width = options.width || 100;
        const height = options.height || 80;
        const position = get().getSmartPosition(width, height);
        
        return new fabric.Rect({
          left: position.left,
          top: position.top,
          width,
          height,
          fill: '#' + Math.floor(Math.random()*16777215).toString(16),
          stroke: '#333333',
          strokeWidth: 2,
          rx: 10,
          ry: 10,
          ...options
        });
      },

      createCircle: (options = {}) => {
        const radius = options.radius || 50;
        const diameter = radius * 2;
        const position = get().getSmartPosition(diameter, diameter);
        console.log("CIRCLE",{
          diameter,
          radius,
          position: position
        })
        
        
        return new fabric.Circle({
          left: position.left,
          top: position.top,
          radius,
          fill: '#' + Math.floor(Math.random()*16777215).toString(16),
          stroke: '#333333',
          strokeWidth: 2,
          ...options
        });
      },

      createText: (text = 'Hello Canvas!', options = {}) => {
        const fontSize = options.fontSize || 24;
        // Estimate text dimensions (rough calculation)
        const textWidth = text.length * fontSize * 0.6;
        const textHeight = fontSize * 1.2;
        const position = get().getSmartPosition(textWidth, textHeight);
        
        return new fabric.Text(text, {
          left: position.left,
          top: position.top,
          fontSize,
          fill: '#333333',
          fontFamily: 'Arial',
          ...options
        });
      },
    }),
    { name: 'canvas-store' }
  )
);

export default useCanvasStore;