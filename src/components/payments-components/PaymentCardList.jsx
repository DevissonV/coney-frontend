import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const PaymentCardList = ({ rows }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {rows.map((payment) => {
        const { raffle, tickets, created_at, amount, currency } = payment;
        const ticketNumbers = tickets.map((t) => `#${t.ticket_number}`).join(', ');
        const buyer = tickets[0]?.user;
        const seller = raffle.created_by;
        const raffleEndDate = dayjs(raffle.end_date);
        const drawDateIsPast = dayjs().isAfter(raffleEndDate);

        const drawDate = raffleEndDate.format('D [de] MMMM [de] YYYY');
        const paidDate = dayjs(created_at).format('D [de] MMMM [de] YYYY  ·  HH:mm');

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={payment.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <EmojiEventsIcon color="warning" />
                  <Typography fontWeight="bold">
                    {raffle.name} (#{raffle.id})
                  </Typography>
                </Box>

                <CardContent sx={{ px: 0, pt: 0 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="body2">
                      {drawDateIsPast ? t('draw_finished') : t('draw_scheduled')}: {drawDate}
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
                      {t('amount_paid')}: ${amount} {currency}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="green">
                      {t('status')}: {t('completed')}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">
                      {t('paid_date')}: {paidDate}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PaymentCardList;
