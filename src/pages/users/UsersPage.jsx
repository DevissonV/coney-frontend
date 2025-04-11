import { useState } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UserCreateModal from '../../components/users-components/UserCreateModal';
import UserEditModal from '../../components/users-components/UserEditModal';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import UserCard from '../../components/users-components/UserCard';
import { useTheme } from '@mui/material/styles';

const UsersPage = ({
  users,
  onDelete,
  onUpdate,
  onCreate,
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useTranslation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setCurrentUser(userToEdit);
    setOpenEditModal(true);
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('users')}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder={t('search_placeholder_user')}
        />
      </Box>

      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateModal(true)}
        >
          {t('create_user')}
        </Button>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={isMobile ? 'center' : 'flex-start'}
      >
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            onEdit={handleEditUser}
            onDelete={onDelete}
          />
        ))}
      </Box>

      <UserCreateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreateUser={(formData, photo) => {
          onCreate(formData, photo);
          setOpenCreateModal(false);
        }}
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
