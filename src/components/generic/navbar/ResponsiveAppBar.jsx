import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Avatar, Tooltip, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { useThemeContext } from '../../../wrappers/ThemeWrapper';
import useAuthStore from '../../../stores/auth/useAuthStore';
import AdbIcon from '@mui/icons-material/Adb';
import { useTranslation } from 'react-i18next'; 

const ResponsiveAppBar = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [anchorElUser, setAnchorElUser] = useState(null); 
  const logout = useAuthStore((state) => state.logout); 
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <AdbIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CONEY
        </Typography>

        <Button component={Link} to="/dashboard" color="inherit" sx={{ mx: 1 }}>
          {t('dashboard')}
        </Button>
        <Button component={Link} to="/users" color="inherit" sx={{ mx: 1 }}>
          {t('users')} 
        </Button>

        <Button component={Link} to="/countries" color="inherit" sx={{ mx: 1 }}>
          {t('countries')} 
        </Button>

        <IconButton color="inherit" onClick={toggleDarkMode} sx={{ mx: 1 }}>
          {darkMode ? t('light_mode') : t('dark_mode')}
        </IconButton>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={t('open_settings')}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Usuario" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
