import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alert, Container, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { markCompleted } from '../../services/payments/paymentService';
import { useTranslation } from 'react-i18next';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (paymentId) {
      markCompleted(paymentId).catch((err) => {
        return err;
      });
    }
  }, [paymentId]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
      <Alert
        severity="success"
        icon={<CheckCircleIcon fontSize="inherit" />}
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight="bold">
          {t('thank_you_for_your_purchase')}
        </Typography>
        <Typography variant="body1">
          {t('your_purchase_is_successful')}
        </Typography>
      </Alert>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/riffle')}
      >
        {t('back_to_riffle')}
      </Button>
    </Container>
  );
};

export default PaymentSuccessPage;
