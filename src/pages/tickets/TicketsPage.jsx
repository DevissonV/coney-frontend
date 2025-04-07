import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import TicketFormModal from '../../components/tickets-components/TicketFormModal';
import { errorAlert } from '../../services/generic/AlertService';
import dayjs from 'dayjs';

import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';

const TicketsPage = ({
  tickets,
  raffle,
  currentPage,
  ticketsPerPage,
  handlePreviousPage,
  handleNextPage,
  handleTicketsPerPageChange,
  selectedTickets,
  setSelectedTickets,
  currentIndex,
  totalPrice,
  handleSelectTicket,
  handleClickOpen,
  currentTickets,
  totalPages,
  startIndex,
  selectedTicketNumbers,
  openModal,
  setOpenModal,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const colors = {
    background: isDarkMode ? '#121212' : '#f9f9f9',
    primary: isDarkMode ? '#90caf9' : '#1976d2',
    secondary: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    accent: isDarkMode ? '#303f9f' : '#e3f2fd',
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        backgroundColor: colors.background,
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        color={colors.text}
      >
        {t('tickets')}
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
      >
        {/* Tickets list */}
        <Box flex={1}>
          <Grid container spacing={1} justifyContent="center">
            {currentTickets && currentTickets.length > 0 ? (
              currentTickets.map((ticket, index) => {
                const isSelected = selectedTickets.some(
                  (t) => t.id === ticket.id,
                );
                return (
                  <Grid item key={ticket.id} xs={3} sm={2} md={1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleSelectTicket(startIndex + index)}
                      sx={{
                        width: '100%',
                        height: 60,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.accent,
                        color: isSelected ? '#fff' : colors.text,
                        border: isSelected
                          ? `2px solid ${colors.primary}`
                          : `2px dashed ${colors.primary}`,
                        '&:hover': {
                          backgroundColor: isSelected
                            ? colors.primary
                            : '#dbeafe',
                        },
                      }}
                    >
                      {ticket.ticket_number}
                    </Button>
                  </Grid>
                );
              })
            ) : (
              <Typography
                variant="body1"
                textAlign="center"
                color={colors.text}
              >
                {t('no_tickets_available')}
              </Typography>
            )}
          </Grid>

          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Button
              variant="outlined"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              color="primary"
            >
              {t('previous')}
            </Button>
            <Typography variant="body2" color={colors.text}>
              {t('page')} {currentPage} {t('of')} {totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              color="primary"
            >
              {t('next')}
            </Button>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <InputLabel id="tickets-per-page-label">
                {t('tickets')}
              </InputLabel>
              <Select
                labelId="tickets-per-page-label"
                value={ticketsPerPage}
                onChange={handleTicketsPerPageChange}
                label={t('tickets')}
              >
                {[100, 50, 10, 30].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Ticket Summary Card */}
        <Box flex={1} maxWidth={400}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderLeft: `4px dashed ${colors.primary}`,
                  borderRadius: 3,
                  backgroundColor: colors.secondary,
                  textAlign: 'center',
                  color: colors.text,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  color="primary"
                >
                  {raffle.name}
                </Typography>
                <Typography variant="body2">
                  {t('raffle_draw_date', {
                    date: dayjs(raffle.end_date).format(
                      'D [de] MMMM [de] YYYY',
                    ),
                  })}
                  <br />
                  {t('raffle_description')}
                </Typography>

                <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                  {selectedTickets.length > 0
                    ? t('selected_ticket_numbers')
                    : t('no_ticket_selected')}
                </Typography>
                <Typography variant="body1">
                  {selectedTickets.length > 0
                    ? selectedTickets.map((t) => t.ticket_number).join(', ')
                    : t('no_ticket_selected')}
                </Typography>
                <Typography variant="body2" mt={2}>
                  {t('unpaid_ticket')}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {t('total')}:{' '}
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                  }).format(totalPrice)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={selectedTickets.length === 0}
                  onClick={() => {
                    const selectedInCurrentPage = currentTickets.some(
                      (ticket) =>
                        selectedTickets.some((t) => t.id === ticket.id),
                    );
                    if (!selectedInCurrentPage) {
                      errorAlert({ messageKey: 'please_select_ticket_first' });
                      return;
                    }
                    handleClickOpen(currentIndex);
                    setOpenModal(true);
                  }}
                >
                  {t('reserve')}
                </Button>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      <TicketFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        initialValues={tickets || { name: '' }}
        selectedTickets={selectedTickets}
        setSelectedTickets={setSelectedTickets}
        selectedTicketNumbers={selectedTicketNumbers}
        totalPrice={totalPrice}
        tickets={tickets}
        raffle={raffle}
      />
    </Box>
  );
};

export default TicketsPage;
