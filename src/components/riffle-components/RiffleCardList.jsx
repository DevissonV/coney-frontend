import { Grid, Box, Typography, useTheme, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RiffleActions from './RiffleActions';
import GenericCard from '../generic/cards/GenericCard';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_IMAGE_NOT_RAFFLES } from '../../utils/generic/constants';

const RiffleCardList = ({
  rows,
  onEdit,
  onDelete,
  onViewTickets,
  handleWinner,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {rows.map((raffle) => {
        const isCreator = user?.id === raffle.created_by;
        const isAdmin = user?.role === ROLE_ADMIN;
        const shouldRequestAuth =
          !raffle.authorization_status || raffle.authorization_status !== 'approved';

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={raffle.id}>
            <GenericCard
              title={raffle.name}
              titleColor={theme.palette.mode === 'dark' ? 'white' : 'black'}
              subtitle={raffle.description}
              content={
                <>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      borderRadius: 2,
                      overflow: 'hidden',
                      mb: 2,
                      backgroundColor: 'background.default',
                    }}
                  >
                    <Box
                      component="img"
                      src={raffle.photo_url || DEFAULT_IMAGE_NOT_RAFFLES}
                      alt={raffle.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>

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

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
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

                  {(isCreator || isAdmin) && shouldRequestAuth && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={1}
                      bgcolor={theme.palette.mode === 'dark' ? '#322' : '#fff8e1'}
                      p={2}
                      borderRadius={2}
                      border={`1px solid ${theme.palette.warning.main}`}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <WarningAmberIcon color="warning" fontSize="small" />
                        <Typography fontSize={13}>
                          {t('authorization_required_message')}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/authorization/${raffle.id}`)}
                      >
                        {t('request_authorization')}
                      </Button>
                    </Box>
                  )}
                </>
              }
              footer={
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="flex-end"
                  px={2}
                  pb={2}
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
        );
      })}
    </Grid>
  );
};

export default RiffleCardList;
