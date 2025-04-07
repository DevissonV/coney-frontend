import { Dialog, Button, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/auth/useAuthStore';
import { jwt_Decode } from '../../utils/generic/jwtDecode';

import { create } from '../../services/payments/paymentService';
import { errorAlert } from '../../services/generic/AlertService';

const TicketFormModal = ({
  open,
  onClose,
  onSubmit,
  selectedTickets,
  selectedTicketNumbers,
  totalPrice,
  raffle,
}) => {
  const { t } = useTranslation();

  const { token } = useAuthStore();
  const decodedToken = jwt_Decode(token);
  const user_id = decodedToken.id;

  const handleSubmit = async () => {
    try {
      selectedTickets.forEach((ticket) => {
        onSubmit({
          ticketId: ticket.id,
          userid: user_id,
        });
      });

      const payload = {
        amount: raffle.price,
        tickets: selectedTickets.map((t) => t.id),
        raffleId: raffle.id,
      };

      const sessionUrl = await create(payload);

      onClose();

      window.location.href = sessionUrl;
    } catch {
      errorAlert({ messageKey: 'error_unexpected' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Card>
        <CardContent style={{ textAlign: 'center' }}>
          {selectedTickets.length > 0 && (
            <>
              <h3>{t('selected_tickets')}</h3>
              <Typography variant="h6" mt={2} fontWeight="bold">
                {selectedTicketNumbers}
              </Typography>
              <Typography variant="h6" mt={2} fontWeight="bold">
                Total:{' '}
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </Typography>
              <Typography variant="body2" mt={2}>
                {t('payment_pending_notice')}
              </Typography>
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {t('reserve')}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default TicketFormModal;
