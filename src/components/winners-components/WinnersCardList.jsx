import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import { ConfirmationNumber } from '@mui/icons-material';

const WinnersCardList = ({ rows }) => {
  const { t } = useTranslation();
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
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 3,
                  boxShadow: 4,
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                }}
              >
                {/* Encabezado */}
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <ConfirmationNumber fontSize="small" />
                      <Typography variant="h6" fontWeight="bold">
                        {winners.raffleName}
                      </Typography>
                    </Box>
                  </Typography>
                </Box>

                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <ConfirmationNumberIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {t('creator')}: <strong>{winners.createdBy}</strong>
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {t('winning_number')}: {winners.winningNumber}
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
                      {t('winner')}: <strong>{winners.winnerName}</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default WinnersCardList;
