import { useCallback } from 'react';
import { fetchUsers, deleteUser, editUser, createUser } from '../../services/users/UserService';
import { errorAlert } from '../../services/generic/alertService';
import useUserStore from '../../stores/users/useUserStore';

export const useUsers = () => {
  const setUsers = useUserStore((state) => state.setUsers); 

  const handleDeleteUser = useCallback(async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      errorAlert({ messageKey: 'error_deleting_user' });
    }
  }, [setUsers]);

  const handleUpdateUser = useCallback(async (userId, updatedUserData) => {
    try {
      await editUser(userId, updatedUserData);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      errorAlert({ messageKey: 'error_updating_user' });
    }
  }, [setUsers]);

  const handleCreateUser = useCallback(async (newUserData) => {
    try {
      await createUser(newUserData);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      errorAlert({ messageKey: 'error_creating_user' });
    }
  }, [setUsers]);

  return {
    handleDeleteUser,
    handleUpdateUser,
    handleCreateUser
  };
};
