import { useCallback } from 'react';
import { fetchUsers, deleteUser, editUser, createUser } from '../../services/users/UserService';
import { errorAlert,confirmDelete,toast } from '../../services/generic/AlertService.js';
import useUserStore from '../../stores/users/useUserStore';

export const useUsers = () => {
  const setUsers = useUserStore((state) => state.setUsers); 

  const handleDeleteUser = useCallback(async (userId) => {
    try {
      const result = await confirmDelete({
        titleKey: 'confirm_delete_title',
        messageKey: 'confirm_delete_message',
      });

      if (result && result.isConfirmed) {
        await deleteUser(userId);
        toast({ icon: 'success', titleKey: 'success', messageKey: 'delete_success' });
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      }
    } catch (error) {
      errorAlert({ messageKey: 'error_deleting_user' });
    }
  }, [setUsers]);

  const handleUpdateUser = useCallback(async (userId, updatedUserData) => {
    try {
      await editUser(userId, updatedUserData);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'edit_success' });
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      errorAlert({ messageKey: 'error_updating_user' });
    }
  }, [setUsers]);

  const handleCreateUser = useCallback(async (newUserData) => {
    try {
      await createUser(newUserData);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'create_success' });
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
