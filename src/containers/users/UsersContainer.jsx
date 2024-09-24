import { useEffect, useState } from 'react';
import useUserStore from '../../stores/users/useUserStore';
import { fetchUsers } from '../../services/users/UserService';
import UsersPage from '../../pages/users/UsersPage';
import { errorAlert } from '../../services/generic/alertService';
import { useUsers } from '../../hooks/users/useUsers'; // Importamos el hook personalizado

const UsersContainer = () => {
  const [loading, setLoading] = useState(true);
  const setUsers = useUserStore((state) => state.setUsers);
  const users = useUserStore((state) => state.users);
  const { handleDeleteUser, handleUpdateUser, handleCreateUser } = useUsers(); 

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
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
    />
  );
};

export default UsersContainer;
