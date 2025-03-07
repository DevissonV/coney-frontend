import { useTranslation } from 'react-i18next';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import WelcomeMessage from '../../components/dashboard-components/WelcomeMessage';
import DashboardWidget from '../../components/dashboard-components/DashboardWidget';
import { Grid, Box } from '@mui/material';
import useAuthStore from '../../stores/auth/useAuthStore';
import {
  ROLE_ANONYMOUS,
  ROLE_ADMIN,
  ROLE_USER,
} from '../../utils/generic/constants';

const DashboardContainer = () => {
  const { t } = useTranslation();
  const { user, token } = useAuthStore();

  const totalUsers = 100;
  const activeRaffles = 10;

  let welcomeMessage;

  if (!token) {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome_to_coney')}
        message={t('intro_to_coney')}
        actionMessage={t('signup_invitation')}
      />
    );
  } else if (user?.role === ROLE_ANONYMOUS) {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome')}
        subtitle={t('attention')}
        message={t('verification_required')}
        actionMessage={t('check_email')}
        footerMessage={t('admin_approval')}
      />
    );
  } else if (user?.role === ROLE_ADMIN || user?.role === ROLE_USER) {
    welcomeMessage = (
      <WelcomeMessage
        title={t('welcome_to_coney')}
        message={t('welcome_to_tool')}
      />
    );
  }

  return (
    <DashboardPage>
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
    </DashboardPage>
  );
};

export default DashboardContainer;
