import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchUsers, createUser } from '../../services/users/UserService';
import UsersTable from '../../components/users-components/UsersTable';
import CreateUserModal from '../../components/users-components/CreateUserModal';
import { toast, errorAlert } from '../../services/generic/alertService'; 
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar'; 

const UsersPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers();
        const formattedData = userData.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        }));
        setRows(formattedData);
        setFilteredRows(formattedData); 
      } catch (error) {
        errorAlert({ messageKey: 'error_loading_users' });
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData); 
      const updatedUsers = await fetchUsers();
      const formattedData = updatedUsers.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setRows(formattedData);
      setFilteredRows(formattedData);
      toast({ icon: 'success', titleKey: 'success', messageKey: 'user_created' }); 
    } catch (error) {
      errorAlert({ messageKey: 'error_creating_user' });
      console.error('Error creating user:', error);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  };

  return (
    <Box padding={2}>
      {/* Contenedor principal para el título centrado y el botón a la derecha */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('users')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenModal(true)}
          style={{ position: 'absolute', right: 0 }}  // Botón alineado a la derecha
        >
          {t('create_user')}
        </Button>
      </Box>

      {/* Campo de búsqueda alineado a la izquierda */}
      <Box display="flex" justifyContent="flex-start" mb={2}>  
        <SearchToolbar 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
          placeholder={t('search_placeholder')}
        />
      </Box>

      <UsersTable
        rows={filteredRows} 
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={loading}
      />

      <CreateUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreateUser={handleCreateUser}
      />
    </Box>
  );
};

export default UsersPage;
