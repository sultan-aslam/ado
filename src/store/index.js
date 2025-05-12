import { create } from 'zustand'

const useStore = create((set) => ({
  // Add your state here
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export default useStore 