import { Box, Drawer, Divider, Typography } from '@mui/material';
import NavLinks from './NavLinks'; // Importamos el componente NavLinks

const ResponsiveDrawer = ({ mobileOpen, handleDrawerToggle, darkMode }) => {
  const drawerWidth = 240;

  return (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          CONEY
        </Typography>
        <Divider />
        <NavLinks darkMode={darkMode} /> 
        <Divider />
      </Box>
    </Drawer>
  );
};

export default ResponsiveDrawer;
