import { Box, Typography, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import GenericCard from '../../components/generic/cards/GenericCard';
import { color } from 'framer-motion';

const WinnersCardList = ({ rows }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {rows.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="text.secondary">
            {t('No_winners_available')}
          </Typography>
        </Grid>
      ) : (
        rows.map((winners) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={winners.id}>
            <GenericCard
              title={winners.raffleName}
              titleColor={theme.palette.mode === 'dark' ? 'white' : 'black'}
              subtitle={`${t('creator')}: ${winners.createdBy}`}
              content={
                <>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <ConfirmationNumberIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {t('winning_number')}:{' '}
                      <strong>{winners.winningNumber}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 32,
                        height: 32,
                      }}
                    >
                      <EmojiEventsIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {t('winners')}: <strong>{winners.winnerName}</strong>
                    </Typography>
                  </Box>
                </>
              }
              icon={<EmojiEventsIcon />}
              headerStyle={{
                bgcolor: 'transparent',
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
              backgroundColor="transparent"
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default WinnersCardList;
