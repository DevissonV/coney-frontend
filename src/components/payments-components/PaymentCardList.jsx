import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useAuthStore from '../../stores/auth/useAuthStore';
import GenericCard from '../generic/cards/GenericCard';
import { motion } from 'framer-motion';

const PaymentCardList = ({ rows }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const visibleRows = rows.filter((payment) => {
    if (user?.role === 'admin') return true;

    const buyerId = payment.tickets?.[0]?.user?.id;
    return buyerId === user?.id;
  });

  return (
    <Grid container spacing={3}>
      {visibleRows.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="text.secondary">
            {t('no_payments_available')}
          </Typography>
        </Grid>
      ) : (
        visibleRows.map((payment) => {
          const {
            raffle,
            tickets,
            created_at,
            amount,
            currency,
            status: paymentStatus,
            stripe_session_url,
          } = payment;
          const ticketNumbers = tickets
            .map((t) => `#${t.ticket_number}`)
            .join(', ');
          const buyer = tickets[0]?.user;
          const seller = raffle.created_by;
          const raffleEndDate = dayjs(raffle.end_date);
          const drawDateIsPast = dayjs().isAfter(raffleEndDate);

          const drawDate = raffleEndDate.format('D [de] MMMM [de] YYYY');
          const paidDate = dayjs(created_at).format(
            'D [de] MMMM [de] YYYY  ·  HH:mm',
          );

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={payment.id}>
              <GenericCard
                headerStyle={{ display: 'none' }}
                backgroundColor="transparent"
                content={
                  <Box sx={{ p: 2, pt: 1 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <EmojiEventsIcon color="warning" />
                      <Typography fontWeight="bold">
                        {raffle.name} (#{raffle.id})
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2">
                        {drawDateIsPast
                          ? t('draw_finished')
                          : t('draw_scheduled')}
                        : {drawDate}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2">
                        {t('buyer')}: {buyer?.first_name} {buyer?.last_name}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2">
                        {t('seller')}: {seller?.first_name} {seller?.last_name}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <ConfirmationNumberIcon fontSize="small" />
                      <Typography variant="body2">
                        {t('tickets')}: {ticketNumbers}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AttachMoneyIcon fontSize="small" />
                      <Typography variant="body2">
                        {t('amount_paid')}:{' '}
                        {new Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: currency,
                          minimumFractionDigits: 0,
                        }).format(amount)}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      {paymentStatus === 'completed' && (
                        <CheckCircleIcon color="success" fontSize="small" />
                      )}
                      {paymentStatus === 'pending' && (
                        <AccessTimeIcon color="warning" fontSize="small" />
                      )}
                      {paymentStatus === 'failed' && (
                        <AttachMoneyIcon color="error" fontSize="small" />
                      )}
                      {paymentStatus === 'canceled' && (
                        <AttachMoneyIcon color="disabled" fontSize="small" />
                      )}

                      <Typography
                        variant="body2"
                        color={
                          paymentStatus === 'completed'
                            ? 'green'
                            : paymentStatus === 'pending'
                              ? 'orange'
                              : paymentStatus === 'failed'
                                ? 'red'
                                : 'gray'
                        }
                      >
                        {t('status')}: {t(paymentStatus)}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2">
                        {t('paid_date')}: {paidDate}
                      </Typography>
                    </Box>

                    {paymentStatus === 'pending' && stripe_session_url && (
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          startIcon={<AttachMoneyIcon />}
                          onClick={() =>
                            (window.location.href = stripe_session_url)
                          }
                        >
                          {t('pay_now')}
                        </Button>
                      </motion.div>
                    )}
                  </Box>
                }
              />
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default PaymentCardList;
