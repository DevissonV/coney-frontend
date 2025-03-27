import { useCallback } from 'react';
import {
  fetchUsers,
  deleteUser,
  editUser,
  createUser,
  approveUser,
  resendEmail,
  recoverPassword,
  changeUserPassword,
} from '../../services/users/UserService';
import {
  errorAlert,
  confirmDelete,
  toast,
} from '../../services/generic/AlertService.js';
import useUserStore from '../../stores/users/useUserStore';
import useAuthStore from '../../stores/auth/useAuthStore';

/**
 * Custom hook to manage user-related operations.
 * @returns {Object} User management functions.
 */
export const useUsers = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const loggedInUser = useAuthStore((state) => state.user);
  const updateAuthUser = useAuthStore((state) => state.updateUser);

  const handleTotalUsers = useCallback(
    async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        errorAlert({ messageKey: 'error_fetching_users' });
      }
    }
  );

  /**
   * Deletes a user after confirmation.
   * @param {number} userId - The ID of the user to delete.
   */
  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        const result = await confirmDelete({
          titleKey: 'confirm_delete_title',
          messageKey: 'confirm_delete_message',
        });

        if (result && result.isConfirmed) {
          await deleteUser(userId);
          toast({
            icon: 'success',
            titleKey: 'success',
            messageKey: 'delete_success',
          });
          const updatedUsers = await fetchUsers();
          setUsers(updatedUsers);
        }
      } catch {
        errorAlert({ messageKey: 'error_deleting_user' });
      }
    },
    [setUsers],
  );

  /**
   * Updates a user's information.
   * @param {number} userId - The ID of the user to update.
   * @param {Object} updatedUserData - The updated user data.
   */
  const handleUpdateUser = useCallback(
    async (userId, updatedUserData) => {
      try {
        await editUser(userId, updatedUserData);
        toast({
          icon: 'success',
          titleKey: 'success',
          messageKey: 'edit_success',
        });
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);

        if (loggedInUser.id === userId) {
          updateAuthUser(updatedUserData);
        }
      } catch {
        errorAlert({ messageKey: 'error_updating_user' });
      }
    },
    [setUsers, loggedInUser, updateAuthUser],
  );

  /**
   * Creates a new user.
   * @param {Object} newUserData - The data for the new user.
   */
  const handleCreateUser = useCallback(
    async (newUserData) => {
      try {
        await createUser(newUserData);
        toast({
          icon: 'success',
          titleKey: 'success',
          messageKey: 'create_success',
        });
      } catch {
        errorAlert({ messageKey: 'error_creating_user' });
      }
    },
    [setUsers],
  );

  /**
   * Approves a user by their email.
   * @param {string} email - The email of the user to approve.
   */
  const handleApproveUser = useCallback(
    async (email) => {
      try {
        await approveUser(email);
        toast({
          icon: 'success',
          titleKey: 'success',
          messageKey: 'user_approved',
        });
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      } catch {
        errorAlert({ messageKey: 'error_approving_user' });
      }
    },
    [setUsers],
  );

  /**
   * Resends a verification email.
   * @param {string} email - The email to resend the verification to.
   */
  const handleResendEmail = useCallback(
    async (email) => {
      try {
        await resendEmail(email);
        toast({
          icon: 'success',
          titleKey: 'success',
          messageKey: 'email_resent',
        });
      } catch {
        errorAlert({ messageKey: 'error_resending_email' });
      }
    },
    [setUsers],
  );

  /**
   * Initiates password recovery for a user.
   * @param {string} email - The email associated with the user account.
   */
  const handleRecoverPassword = useCallback(async (email) => {
    try {
      await recoverPassword(email);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'email_sent' });
    } catch {
      errorAlert({ messageKey: 'error_sending_email' });
    }
  }, []);

  /**
   * Changes a user's password.
   * @param {string} email - The email of the user.
   * @param {string} newPassword - The new password.
   */
  const handleChangePassword = useCallback(async (email, newPassword) => {
    try {
      await changeUserPassword(email, newPassword);
      toast({
        icon: 'success',
        titleKey: 'success',
        messageKey: 'password_change_success',
      });
    } catch {
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
    handleChangePassword,
    handleTotalUsers
  };
};
