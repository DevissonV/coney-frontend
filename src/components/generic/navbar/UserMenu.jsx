import { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../../stores/auth/useAuthStore'; 

const UserMenu = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
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
          <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>{t('login')}</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
