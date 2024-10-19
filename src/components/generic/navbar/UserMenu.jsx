import { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip, Typography, ListItemIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../../stores/auth/useAuthStore'; 
import UserEditModal from '../../users-components/UserEditModal';
import { useUsers } from '../../../hooks/users/useUsers'; 
import { Edit as EditIcon, Logout as LogoutIcon } from '@mui/icons-material'; 

const UserMenu = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const { t } = useTranslation();
  const { token, user } = useAuthStore(); 
  const { handleUpdateUser } = useUsers(); 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    window.location.href = "/login"; 
  };

  const handleEditProfile = () => {
    setOpenEditModal(true); 
    setAnchorElUser(null); 
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
          [
            <MenuItem key="user-infos" disabled>
              <Typography variant="h5" textAlign="center">
                {`${user?.firstName} ${user?.lastName}`}  
              </Typography>
            </MenuItem>,

            <MenuItem key="edit-profile" onClick={handleEditProfile}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              {t('edit_profile')}
            </MenuItem>,
            
            <MenuItem key="logout" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              {t('logout')}
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleLogin}>{t('login')}</MenuItem>
        )}
      </Menu>

      <UserEditModal 
        open={openEditModal} 
        onClose={() => setOpenEditModal(false)} 
        currentUser={user} 
        onEditUser={handleUpdateUser} 
      />
    </>
  );
};

export default UserMenu;
