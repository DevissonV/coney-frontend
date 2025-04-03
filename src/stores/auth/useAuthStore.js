import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for managing authentication state.
 *
 * This store persists authentication data using local storage.
 */
const useAuthStore = create(
  persist(
    (set) => ({
      /**
       * Authentication token.
       * @type {string|null}
       */
      token: null,

      /**
       * Authenticated user data.
       * @type {Object|null}
       */
      user: null,

      /**
       * Sets the user and token in the store and local storage.
       * @param {Object} user - The authenticated user object.
       * @param {string} token - The authentication token.
       */
      setUserAndToken: (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ token, user });
      },

      /**
       * Logs out the user by clearing authentication data from the store and local storage.
       */
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
      },

      /**
       * Updates the authenticated user data.
       * @param {Object} updatedUserData - The updated user data.
       */
      updateUser: (updatedUserData) => {
        set((state) => {
          const updatedUser = { ...state.user, ...updatedUserData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return { user: updatedUser };
        });
      },
    }),
    {
      name: 'auth',
      getStorage: () => localStorage,
    },
  ),
);

export default useAuthStore;
