import { useState, useEffect } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UsersTable from '../../components/users-components/UsersTable';
import UserCreateModal from '../../components/users-components/UserCreateModal';
import UserEditModal from '../../components/users-components/UserEditModal';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import { useTheme } from '@mui/material/styles';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';

const UsersPage = ({ 
  users, 
  loading, 
  onDelete, 
  onUpdate, 
  onCreate, 
  onApprove, 
  onResendEmail 
}) => {
  const { t } = useTranslation();
  const [filteredRows, setFilteredRows] = useState(users); 
  const [pageSize, setPageSize] = useState(5);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const { user } = useAuthStore();

  useEffect(() => {
    setFilteredRows(users); 
  }, [users]);

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setCurrentUser(userToEdit);
    setOpenEditModal(true);
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

  return (
    <Box padding={2}>
      <Box 
        display="flex" 
        justifyContent={isMobile ? "center" : "space-between"} 
        alignItems={isMobile ? "center" : "flex-start"} 
        mb={2} 
        flexDirection={isMobile ? "column" : "row"}
      >
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('users')}
        </Typography>

        {user?.role === ROLE_ADMIN && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOpenCreateModal(true)}
            style={{ marginTop: isMobile ? "16px" : "0", right: 0 }}
          >
            {t('create_user')}
          </Button>
        )}
      </Box>

      <Box display="flex" justifyContent={isMobile ? "center" : "flex-start"} mb={2}>
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
        onDelete={onDelete}
        onApprove={onApprove}
        onResendEmail={onResendEmail}
      />

      <UserCreateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreateUser={onCreate} 
      />

      <UserEditModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)} 
        currentUser={currentUser} 
        onEditUser={onUpdate}
      />
    </Box>
  );
};

export default UsersPage;
