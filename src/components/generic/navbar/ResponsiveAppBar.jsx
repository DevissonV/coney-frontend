import { AppBar, Toolbar, Typography, IconButton, Box, CssBaseline } from '@mui/material';
import { useState } from 'react'; 
import MenuIcon from '@mui/icons-material/Menu';  
import ThemeToggleButton from './ThemeToggleButton';
import UserMenu from './UserMenu';
import ResponsiveDrawer from './ResponsiveDrawer';
import NavLinks from './NavLinks';
import { useThemeContext } from '../../../wrappers/ThemeWrapper';
import useAuthStore from '../../../stores/auth/useAuthStore';

const ResponsiveAppBar = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false); 
  const logout = useAuthStore((state) => state.logout); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
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
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CONEY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLinks darkMode={darkMode} />
          </Box>

  
          <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

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
