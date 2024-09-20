import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  data: {},

  setData: (data) => set({ data }),
}))

export default useDashboardStore
