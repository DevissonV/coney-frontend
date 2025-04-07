import { Box, Typography } from '@mui/material';
import PaymentCardList from '../../components/payments-components/PaymentCardList';
import { useTranslation } from 'react-i18next';

const PaymentsPage = ({ payments }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        {t('payments')}
      </Typography>
      <PaymentCardList rows={payments} />
    </Box>
  );
};

export default PaymentsPage;
