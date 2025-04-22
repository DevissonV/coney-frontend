import { useState } from 'react';
import { Dialog, Button, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/auth/useAuthStore';
import { jwt_Decode } from '../../utils/generic/jwtDecode';

import { create } from '../../services/payments/paymentService';
import { errorAlert } from '../../services/generic/AlertService';
import { editTicket } from '../../services/tickets/TicketService';

const TicketFormModal = ({
  open,
  onClose,
  onSubmit,
  setSelectedTickets,
  selectedTickets,
  selectedTicketNumbers,
  totalPrice,
  raffle,
  loadTickets,
  setTotalPrice,
}) => {
  const { t } = useTranslation();
  const { token } = useAuthStore();
  const decodedToken = jwt_Decode(token);
  const user_id = decodedToken.id;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const reservedTicketIds = [];

    try {
      for (const ticket of selectedTickets) {
        try {
          await onSubmit({
            ticketId: ticket.id,
            userId: user_id,
          });

          reservedTicketIds.push(ticket.id);
        } catch (err) {
          onClose();

          await Promise.allSettled(
            reservedTicketIds.map((ticketId) =>
              editTicket({ ticketId, userId: null }),
            ),
          );

          const messageKey =
            err?.response?.data?.message || 'error_updating_ticket';

          errorAlert({
            messageKey,
            interpolation: { ticket: ticket.ticket_number },
          });

          await loadTickets(raffle.id);
          setSelectedTickets([]);
          setTotalPrice(0);
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        amount: raffle.price,
        tickets: selectedTickets.map((t) => t.id),
        raffleId: raffle.id,
      };

      const sessionUrl = await create(payload);

      onClose();
      setSelectedTickets([]);
      setTotalPrice(0);
      setIsSubmitting(false);
      window.location.href = sessionUrl;
    } catch {
      errorAlert({ messageKey: 'error_unexpected' });
      setIsSubmitting(false);
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('loading') : t('reserve')}
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
