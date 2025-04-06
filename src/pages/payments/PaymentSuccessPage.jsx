import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alert, Container, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { update } from '../../services/payments/paymentService';
import { useTranslation } from 'react-i18next';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (paymentId) {
      update(paymentId, { status: 'completed' }).catch((err) => {
        console.error('Error updating payment to completed:', err);
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

      <Button variant="contained" color="primary" onClick={() => navigate('/riffle')}>
        Volver a Rifas
      </Button>
    </Container>
  );
};

export default PaymentSuccessPage;
