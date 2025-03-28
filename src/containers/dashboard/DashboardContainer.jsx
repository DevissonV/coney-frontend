import { useTranslation } from 'react-i18next';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import WelcomeMessage from '../../components/dashboard-components/WelcomeMessage';
import DashboardWidget from '../../components/dashboard-components/DashboardWidget';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useUsers } from '../../hooks/users/useUsers';
import { errorAlert } from '../../services/generic/AlertService.js';
import { fetchUsers } from '../../services/users/UserService';
import { fetchRaffle } from '../../services/riffle/RiffleService';
import { jwt_Decode } from '../../utils/generic/jwtDecode';

import {
  ROLE_ANONYMOUS,
  ROLE_ADMIN,
  ROLE_USER,
} from '../../utils/generic/constants';

import { useEffect, useState, useMemo } from 'react';

const DashboardContainer = () => {
  const [loading, setLoading] = useState(true);
  const [totalRaffles, setTotalRaffles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeRaffles, setactiveRaffles] = useState(0);
  const { handleTotalUsers } = useUsers();

  const { t } = useTranslation();
  const { user, token } = useAuthStore();

  const decodedToken = useMemo(() => {
    if (token) {
      try {
        return jwt_Decode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }, [token]);

  useEffect(() => {
    const loadUsers = async () => {
      if (decodedToken?.role === 'admin') {
        setLoading(true);
        try {
          const usersData = await fetchUsers();
          setTotalUsers(usersData.length);
        } catch (error) {
          errorAlert({ messageKey: 'error_loading_users' });
        } finally {
          setLoading(false);
        }
      }
    };

    const loadRaffles = async () => {
      setLoading(true);
      try {
        const raffleData = await fetchRaffle();
        console.log(raffleData);
        setactiveRaffles(raffleData.length);
      } catch (error) {
        console.log(error);
        errorAlert({ messageKey: 'error_loading_users' });
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
    loadRaffles();
  }, [decodedToken]);

  let welcomeMessage;
  let content;

  if (!token) {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome_to_coney')}
        message={t('intro_to_coney')}
        actionMessage={t('signup_invitation')}
      />
    );

    content = (
      <>
        {welcomeMessage}
        <Box padding={4}>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={12}>
              <DashboardWidget
                title={t('active_raffles')}
                value={activeRaffles}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  } else if (decodedToken?.role == 'anonymous') {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome')}
        subtitle={t('attention')}
        message={t('verification_required')}
        actionMessage={t('check_email')}
        footerMessage={t('admin_approval')}
      />
    );

    content = <>{welcomeMessage}</>;
  } else if (decodedToken?.role == 'admin') {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome_to_coney')}
        message={t('welcome_to_tool')}
      />
    );

    content = (
      <>
        {welcomeMessage}
        <Box padding={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <DashboardWidget title={t('total_users')} value={totalUsers} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DashboardWidget
                title={t('active_raffles')}
                value={activeRaffles}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  } else if (decodedToken?.role == 'user') {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome_to_coney')}
        message={t('welcome_to_tool')}
      />
    );

    content = (
      <>
        {welcomeMessage}
        <Box padding={4}>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={12}>
              <DashboardWidget
                title={t('active_raffles')}
                value={activeRaffles}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  return <DashboardPage>{content}</DashboardPage>;
};

export default DashboardContainer;
