import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setUserAndToken: (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ token, user });
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
      },

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
    }
  )
);

export default useAuthStore;
