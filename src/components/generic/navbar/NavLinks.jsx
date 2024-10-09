import { ListItem, ListItemText, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const NavLinks = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // For mobile screens, we use a vertical list. On large screens, we align horizontally
  return (
    <Box sx={{ display: isMobile ? 'block' : 'flex', gap: 2 }}>
      <ListItem component={Link} to="/dashboard" sx={{ width: 'auto' }}>
        <ListItemText primary={t('dashboard')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>
      <ListItem component={Link} to="/users" sx={{ width: 'auto' }}>
        <ListItemText primary={t('users')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>
      <ListItem component={Link} to="/countries" sx={{ width: 'auto' }}>
        <ListItemText primary={t('countries')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>
      <ListItem component={Link} to="/riffle" sx={{ width: 'auto' }}>
        <ListItemText primary={t('riffle')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>
      <ListItem component={Link} to="/tickets" sx={{ width: 'auto' }}>
        <ListItemText primary={t('tickets')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>
    </Box>
  );
};

export default NavLinks;
