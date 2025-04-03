import { create } from 'zustand';

/**
 * Zustand store for managing dashboard state.
 *
 * Provides actions for setting dashboard data.
 */
const useDashboardStore = create((set) => ({
  /**
   * Object containing dashboard data.
   * @type {Object}
   */
  data: {},

  /**
   * Sets the dashboard data.
   * @param {Object} data - The new dashboard data.
   */
  setData: (data) => set({ data }),
}));

export default useDashboardStore;
