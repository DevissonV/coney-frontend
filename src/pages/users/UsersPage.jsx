import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UsersTable from '../../components/users-components/UsersTable';
import CreateUserModal from '../../components/users-components/CreateUserModal';
import EditUserModal from '../../components/users-components/EditUserModal';
import { toast, errorAlert, confirmDelete } from '../../services/generic/AlertService.js'; 
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';

const UsersPage = ({ users, loading, onDelete, onUpdate, onCreate }) => {
  const { t } = useTranslation();
  const [filteredRows, setFilteredRows] = useState(users); 
  const [pageSize, setPageSize] = useState(5);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredRows(users); 
  }, [users]);

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setCurrentUser(userToEdit);
    setOpenEditModal(true);
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      await onUpdate(userId, updatedUserData); 
      toast({ icon: 'success', titleKey: 'success', messageKey: 'edit_success' });
    } catch (error) {
      errorAlert({ messageKey: 'error_updating_user' });
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await confirmDelete({
        titleKey: 'confirm_delete_title',
        messageKey: 'confirm_delete_message',
      });

      if (result && result.isConfirmed) {
        await onDelete(userId); 
        toast({ icon: 'success', titleKey: 'success', messageKey: 'delete_success' });
      }

    } catch (error) {
      errorAlert({ messageKey: 'error_deleting_user' });
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredRows(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  };

  const handleCreateUser = async (newUserData) => {
    try {
      await onCreate(newUserData); 
      toast({ icon: 'success', titleKey: 'success', messageKey: 'create_success' });
      setOpenCreateModal(false);  
    } catch (error) {
      errorAlert({ messageKey: 'error_creating_user' });
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('users')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenCreateModal(true)}
          style={{ position: 'absolute', right: 0 }}
        >
          {t('create_user')}
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <SearchToolbar
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange}
          placeholder={t('search_placeholder_user')}
        />
      </Box>

      <UsersTable
        rows={filteredRows}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={loading}
        onEdit={handleEditUser} 
        onDelete={handleDeleteUser}
      />

      <CreateUserModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreateUser={handleCreateUser} 
      />

      <EditUserModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)} 
        currentUser={currentUser} 
        onEditUser={handleUpdateUser}
      />
    </Box>
  );
};

export default UsersPage;
