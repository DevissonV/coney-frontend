import { Box, Typography } from '@mui/material';
import WinnersCardList from '../../components/winners-components/WinnersCardList';
import { useTranslation } from 'react-i18next';

const WinnersPage = ({ winners }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        {t('winners')}
      </Typography>
      <WinnersCardList rows={winners} />
    </Box>
  );
};
export default WinnersPage;
