import { useCallback } from 'react';
import { 
  fetchUsers, 
  deleteUser,
  editUser, 
  createUser,
  approveUser,
  resendEmail,
  recoverPassword,
  changeUserPassword 
} from '../../services/users/UserService';
import { errorAlert, confirmDelete, toast } from '../../services/generic/AlertService.js';
import useUserStore from '../../stores/users/useUserStore';
import useAuthStore from '../../stores/auth/useAuthStore'; 

export const useUsers = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const loggedInUser = useAuthStore((state) => state.user);
  const updateAuthUser = useAuthStore((state) => state.updateUser);

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

      if (loggedInUser.id === userId) {
        updateAuthUser(updatedUserData);
      }
    } catch (error) {
      errorAlert({ messageKey: 'error_updating_user' });
    }
  }, [setUsers, loggedInUser, updateAuthUser]);

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

  const handleApproveUser = useCallback(async (email) => {
    try {
      await approveUser(email);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'user_approved' });
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      errorAlert({ messageKey: 'error_approving_user' });
    }
  }, [setUsers]);

  const handleResendEmail = useCallback(async (email) => {
    try {
      await resendEmail(email);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'email_resent' });
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      errorAlert({ messageKey: 'error_resending_email' });
    }
  }, [setUsers]);

  const handleRecoverPassword = useCallback(async (email) => {
    try {
      await recoverPassword(email);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'email_sent' });
    } catch (error) {
      errorAlert({ messageKey: 'error_sending_email' });
    }
  }, []);

  const handleChangePassword = useCallback(async (email, newPassword) => {
    try {
      await changeUserPassword(email, newPassword);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'password_change_success' });
    } catch (error) {
      errorAlert({ messageKey: 'error_changing_password' });
    }
  }, []);

  return {
    handleDeleteUser,
    handleUpdateUser,
    handleCreateUser,
    handleApproveUser,
    handleResendEmail,
    handleRecoverPassword,
    handleChangePassword 
  };
};
