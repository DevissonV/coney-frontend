import { useTranslation } from 'react-i18next'; 
import DashboardPage from '../../pages/dashboard/DashboardPage';
import WelcomeMessage from '../../components/dashboard-components/WelcomeMessage';
import DashboardWidget from '../../components/dashboard-components/DashboardWidget';
import { Grid, Box } from '@mui/material';

const DashboardContainer = () => {
  const { t } = useTranslation(); 

  const totalUsers = 100;
  const activeRaffles = 10;

  return (
    <DashboardPage>
      <WelcomeMessage />
      <Box padding={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <DashboardWidget title={t('total_users')} value={totalUsers} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DashboardWidget title={t('active_raffles')} value={activeRaffles} />
          </Grid>
        </Grid>
      </Box>
    </DashboardPage>
  );
};  

export default DashboardContainer;
