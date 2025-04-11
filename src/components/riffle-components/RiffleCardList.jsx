import { Grid, Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RiffleActions from './RiffleActions';
import GenericCard from '../generic/cards/GenericCard';

const RiffleCardList = ({
  rows,
  onEdit,
  onDelete,
  onViewTickets,
  handleWinner,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {rows.map((raffle) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={raffle.id}>
          <GenericCard
            title={raffle.name}
            titleColor={theme.palette.mode === 'dark' ? 'white' : 'black'}
            subtitle={raffle.description}
            content={
              <>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <EventIcon fontSize="small" />
                  <Typography variant="body2">
                    {t('end_date')}:{' '}
                    {dayjs(raffle.end_date).format('DD-MM-YYYY HH:mm')}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <ConfirmationNumberIcon fontSize="small" />
                  <Typography variant="body2">
                    {t('available_tickets')}: {raffle.available_tickets}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <AttachMoneyIcon fontSize="small" />
                  <Typography variant="body2">
                    {t('price')}:{' '}
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0,
                    }).format(raffle.price)}
                  </Typography>
                </Box>
              </>
            }
            footer={
              <Box
                position={'relative'}
                width={'100%'}
                display="flex"
                justifyContent="flex-end"
                sx={{ px: 2, pb: 2 }}
              >
                <RiffleActions
                  riffleId={raffle.id}
                  availableTickets={raffle.available_tickets}
                  createdBy={raffle.created_by}
                  onEdit={() => onEdit(raffle)}
                  onDelete={onDelete}
                  onViewTickets={onViewTickets}
                  handleWinner={handleWinner}
                />
              </Box>
            }
            icon={<ConfirmationNumberIcon />}
            headerStyle={{
              bgcolor: 'transparent',
              color: 'black',
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RiffleCardList;
