import { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UserMenu = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { t } = useTranslation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
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
        <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
