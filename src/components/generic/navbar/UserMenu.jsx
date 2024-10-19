import { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip, Typography, ListItemIcon } from '@mui/material';
import { Edit as EditIcon, Logout as LogoutIcon, Lock as LockIcon } from '@mui/icons-material'; 
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../../stores/auth/useAuthStore'; 
import UserEditModal from '../../users-components/UserEditModal';
import UserChangePasswordModal from '../../users-components/UserChangePasswordModal'; 
import { useUsers } from '../../../hooks/users/useUsers';

const UserMenu = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const { t } = useTranslation();
  const { token, user } = useAuthStore();
  const { handleUpdateUser } = useUsers();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleEditProfile = () => {
    setOpenEditModal(true);
    setAnchorElUser(null);
  };

  const handleChangePassword = () => {
    setOpenPasswordModal(true);
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <Tooltip title={t('open_settings')}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Usuario" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {token ? (
          <div>
            <MenuItem key="user-infos" disabled>
              <Typography variant="h5" textAlign="center">
                {`${user?.firstName} ${user?.lastName}`}  
              </Typography>
            </MenuItem>

            <MenuItem key="edit-profile" onClick={handleEditProfile}>
              <ListItemIcon>
                <EditIcon fontSize="small" /> 
              </ListItemIcon>
              {t('edit_profile')}
            </MenuItem>

            <MenuItem key="change-password" onClick={handleChangePassword}>
              <ListItemIcon>
                <LockIcon fontSize="small" /> 
              </ListItemIcon>
              {t('change_password')}
            </MenuItem>
            
            <MenuItem key="logout" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              {t('logout')}
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleLogin}>{t('login')}</MenuItem>
        )}
      </Menu>

      {/* Modals */}
      <UserEditModal open={openEditModal} onClose={() => setOpenEditModal(false)} currentUser={user} onEditUser={handleUpdateUser} />
      <UserChangePasswordModal open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} userId={user?.id} />
    </>
  );
};

export default UserMenu;
