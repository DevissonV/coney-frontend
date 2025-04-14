import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alert, Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';
import { update } from '../../services/payments/paymentService';
import { errorAlert } from '../../services/generic/AlertService';

const PaymentCancelPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentId) {
      update(paymentId, { status: 'pending' }).catch(() => {
        errorAlert({ messageKey: 'error_updating_payment' });
      });
    }
  }, [paymentId]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="inherit" />}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6" fontWeight="bold">
          {t('payment_failed_title')}
        </Typography>
        <Typography variant="body1">{t('payment_failed_message')}</Typography>
      </Alert>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/payments')}
      >
        {t('back_to_payment')}
      </Button>
    </Container>
  );
};

export default PaymentCancelPage;
