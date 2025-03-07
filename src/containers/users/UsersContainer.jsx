import { useEffect, useState } from 'react';
import useUserStore from '../../stores/users/useUserStore';
import { fetchUsers } from '../../services/users/UserService';
import UsersPage from '../../pages/users/UsersPage';
import { errorAlert } from '../../services/generic/AlertService.js';
import { useUsers } from '../../hooks/users/useUsers';

/**
 * Container component for managing user-related state and actions.
 * It fetches users on mount and provides necessary handlers to the UsersPage component.
 * @component
 */
const UsersContainer = () => {
  const [loading, setLoading] = useState(true);
  const setUsers = useUserStore((state) => state.setUsers);
  const users = useUserStore((state) => state.users);
  const {
    handleDeleteUser,
    handleUpdateUser,
    handleCreateUser,
    handleApproveUser,
    handleResendEmail,
  } = useUsers();

  /**
   * Fetches users from the API and updates the state.
   */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch {
        errorAlert({ messageKey: 'error_loading_users' });
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [setUsers]);

  return (
    <UsersPage
      users={users}
      loading={loading}
      onDelete={handleDeleteUser}
      onUpdate={handleUpdateUser}
      onCreate={handleCreateUser}
      onApprove={handleApproveUser}
      onResendEmail={handleResendEmail}
    />
  );
};

export default UsersContainer;
