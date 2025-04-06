import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggleButton from './ThemeToggleButton';
import UserMenu from './UserMenu';
import ResponsiveDrawer from './ResponsiveDrawer';
import NavLinks from './NavLinks';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useThemeContext } from '../../../wrappers/ThemeWrapper';
import useAuthStore from '../../../stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../../services/generic/AlertService';
import LanguageToggleButton from './LanguageToggleButton';

const ResponsiveAppBar = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/dashboard');
    toast({ icon: 'success', titleKey: 'session_ended' });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <EmojiEventsIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CONEY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLinks darkMode={darkMode} />
          </Box>

          <ThemeToggleButton
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          <LanguageToggleButton />

          <UserMenu handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>

      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        darkMode={darkMode}
      />
    </Box>
  );
};

export default ResponsiveAppBar;
