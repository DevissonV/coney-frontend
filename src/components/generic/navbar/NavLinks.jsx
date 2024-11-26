import { ListItem, ListItemText, Box, useMediaQuery, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Dashboard, ConfirmationNumber, Group, Public} from '@mui/icons-material';
import useAuthStore from '../../../stores/auth/useAuthStore'; 
import { ROLE_ADMIN } from '../../../utils/generic/constants';

const NavLinks = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { token, user } = useAuthStore(); 

  return (
    <Box sx={{ display: isMobile ? 'block' : 'flex', gap: 2 }}>
      {/* Link accessible to everyone */}
      <ListItem component={Link} to="/dashboard" sx={{ width: 'auto' }}>
        <ListItemIcon>
          <Dashboard sx={{ color: isMobile ? (darkMode ? '#fff' : '#000') : '#fff' }} />
        </ListItemIcon>
        <ListItemText
          primary={t('dashboard')}
          sx={{
            color: isMobile
              ? (darkMode ? '#fff' : '#000') // On mobile, white on dark and black on light
              : '#fff',  // On desktop, always white
            fontSize: isMobile ? '16px' : '18px',
          }}
        />
      </ListItem>

      <ListItem component={Link} to="/riffle" sx={{ width: 'auto' }}>
        <ListItemIcon>
          <ConfirmationNumber sx={{ color: isMobile ? (darkMode ? '#fff' : '#000') : '#fff' }} />
        </ListItemIcon>
        <ListItemText
          primary={t('riffle')}
          sx={{
            color: isMobile
              ? (darkMode ? '#fff' : '#000') 
              : '#fff',  
            fontSize: isMobile ? '16px' : '18px',
          }}
        />
      </ListItem>

      {/* Only show these links if the user is authenticated (has a token) */}
      {token && (
        <>
          {/* Only admins can see the 'users' link */}
          {user?.role === ROLE_ADMIN && (
            <ListItem component={Link} to="/users" sx={{ width: 'auto' }}>
              <ListItemIcon>
                <Group sx={{ color: isMobile ? (darkMode ? '#fff' : '#000') : '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('users')}
                sx={{
                  color: isMobile
                    ? (darkMode ? '#fff' : '#000') 
                    : '#fff', 
                  fontSize: isMobile ? '16px' : '18px',
                }}
              />
            </ListItem>
          )}

          {/* Only admins can see the 'countries' link */}
          {user?.role === ROLE_ADMIN && (
            <ListItem component={Link} to="/countries" sx={{ width: 'auto' }}>
              <ListItemIcon>
                <Public sx={{ color: isMobile ? (darkMode ? '#fff' : '#000') : '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('countries')}
                sx={{
                  color: isMobile
                    ? (darkMode ? '#fff' : '#000') 
                    : '#fff',  
                  fontSize: isMobile ? '16px' : '18px',
                }}
              />
            </ListItem>
          )}
        </>
      )}
    </Box>
  );
};

export default NavLinks;
