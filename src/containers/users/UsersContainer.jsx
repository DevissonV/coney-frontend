import { useEffect, useState } from 'react';
import useUserStore from '../../stores/users/useUserStore';
import { fetchUsers, deleteUser, editUser,createUser } from '../../services/users/UserService';
import UsersPage from '../../pages/users/UsersPage';

const UsersContainer = () => {
  const [loading, setLoading] = useState(true);
  const setUsers = useUserStore((state) => state.setUsers);
  const users = useUserStore((state) => state.users);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [setUsers]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = await fetchUsers(); 
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      await editUser(userId, updatedUserData);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCreateUser = async (newUserData) => {
    try {
      await createUser(newUserData);  
      const updatedUsers = await fetchUsers();  
      setUsers(updatedUsers); 
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  

  return <UsersPage 
    users={users} 
    loading={loading} 
    onDelete={handleDeleteUser} 
    onUpdate={handleUpdateUser} 
    onCreate={handleCreateUser}
  />;
};

export default UsersContainer;

