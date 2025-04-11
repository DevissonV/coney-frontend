import { useEffect, useState } from 'react';
import useUserStore from '../../stores/users/useUserStore';
import { fetchUsers } from '../../services/users/UserService';
import UsersPage from '../../pages/users/UsersPage';
import { errorAlert } from '../../services/generic/AlertService.js';
import { useUsers } from '../../hooks/users/useUsers';
import { useSearch } from '../../hooks/generic/useSearch';

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


  const filterFn = (user, query) => {
    const normalizedQuery = query?.toLowerCase() || '';
    const first = user?.first_name?.toLowerCase?.() || '';
    const last = user?.last_name?.toLowerCase?.() || '';
    const email = user?.email?.toLowerCase?.() || '';
    return (
      first.includes(normalizedQuery) ||
      last.includes(normalizedQuery) ||
      email.includes(normalizedQuery)
    );
  };

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredUsers,
  } = useSearch(users, filterFn);

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
      users={filteredUsers}
      loading={loading}
      onDelete={handleDeleteUser}
      onUpdate={handleUpdateUser}
      onCreate={handleCreateUser}
      onApprove={handleApproveUser}
      onResendEmail={handleResendEmail}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
};

export default UsersContainer;
