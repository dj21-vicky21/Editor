import { create } from 'zustand'

const useCanvasStore = create((set) => ({
  canvas: [],
  canvasStore: {},
}))

export default useCanvasStore