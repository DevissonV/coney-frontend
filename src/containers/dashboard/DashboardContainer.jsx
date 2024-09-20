import React from 'react';
import { useTranslation } from 'react-i18next'; 
import DashboardPage from '../../pages/dashboard/DashboardPage';
import WelcomeMessage from '../../components/dashboard-components/WelcomeMessage';
import DashboardWidget from '../../components/dashboard-components/DashboardWidget';

const DashboardContainer = () => {
  const { t } = useTranslation(); 


  const totalUsers = 100;
  const activeRaffles = 10;

  return (
    <DashboardPage>
      <WelcomeMessage />
      <DashboardWidget title={t('total_users')} value={totalUsers} />
      <DashboardWidget title={t('active_raffles')} value={activeRaffles} />
    </DashboardPage>
  );
};

export default DashboardContainer;
