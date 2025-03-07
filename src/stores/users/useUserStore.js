import { create } from 'zustand';

/**
 * Zustand store for managing user state.
 *
 * Provides actions for setting, adding, updating, and removing users.
 */
const useUserStore = create((set) => ({
  /**
   * Array of user objects.
   * @type {Array<Object>}
   */
  users: [],

  /**
   * Sets the entire users array.
   * @param {Array<Object>} users - The new list of users.
   */
  setUsers: (users) => set({ users }),

  /**
   * Adds a new user to the state.
   * @param {Object} user - The user object to add.
   */
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),

  /**
   * Updates an existing user in the state.
   * @param {Object} updatedUser - The updated user object.
   */
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),

  /**
   * Removes a user from the state by ID.
   * @param {number} id - The ID of the user to remove.
   */
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));

export default useUserStore;
