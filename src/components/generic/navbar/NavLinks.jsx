import { ListItem, ListItemText, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useAuthStore from '../../../stores/auth/useAuthStore'; 

const NavLinks = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { token, user } = useAuthStore(); 

  return (
    <Box sx={{ display: isMobile ? 'block' : 'flex', gap: 2 }}>
      {/* Link accessible to everyone */}
      <ListItem component={Link} to="/dashboard" sx={{ width: 'auto' }}>
        <ListItemText primary={t('dashboard')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>

      <ListItem component={Link} to="/riffle" sx={{ width: 'auto' }}>
        <ListItemText primary={t('riffle')} sx={{ color: darkMode ? '#fff' : '#000' }} />
      </ListItem>

      {/* Only show these links if the user is authenticated (has a token) */}
      {token && (
        <>
          {/* Only admins can see the 'users' link */}
          {user?.role === 'admin' && (
            <ListItem component={Link} to="/users" sx={{ width: 'auto' }}>
              <ListItemText primary={t('users')} sx={{ color: darkMode ? '#fff' : '#000' }} />
            </ListItem>
          )}

          {/* Only admins can see the 'countries' link */}
          {user?.role === 'admin' && (
            <ListItem component={Link} to="/countries" sx={{ width: 'auto' }}>
              <ListItemText primary={t('countries')} sx={{ color: darkMode ? '#fff' : '#000' }} />
            </ListItem>
          )}
        </>
      )}
    </Box>
  );
};

export default NavLinks;
