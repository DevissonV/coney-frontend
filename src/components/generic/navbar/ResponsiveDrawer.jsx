import { Box, Drawer, Divider, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 
import NavLinks from './NavLinks';

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <EmojiEventsIcon sx={{ mr: 1 }} />
          <Typography variant="h6">
            CONEY
          </Typography>
        </Box>
        <Divider />
        <NavLinks darkMode={darkMode} />
        <Divider />
      </Box>
    </Drawer>
  );
};

export default ResponsiveDrawer;
