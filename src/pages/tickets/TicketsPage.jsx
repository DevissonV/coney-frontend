import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './TicketsPage.css';
import TicketFormModal from '../../components/tickets-components/TicketFormModal';
import { errorAlert } from '../../services/generic/AlertService';

import {
  Box,
  Typography,
  Button,
  Grid2,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  filteredTickets,
  currentTickets,
  totalPages,
  startIndex,
  selectedTicketNumbers,
  openModal,
  setOpenModal,
  onSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <Box className="ContainerPadre">
      <Box className="ContainerTitle">
        <Typography
          variant="h4"
          className="TitleTickets"
          gutterBottom
          textAlign="center"
          flexGrow={1}
        >
          {t('tickets')}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginTop={-12}
        className="containerTickets"
      >
        <Grid2 container spacing={2} maxWidth={500} justifyContent="center">
          {currentTickets && currentTickets.length > 0 ? (
            currentTickets.map((ticket, index) => {
              const isSelected = selectedTickets.some(
                (t) => t.id === ticket.id,
              );
              return (
                <Grid2 key={ticket.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleSelectTicket(startIndex + index)}
                    sx={{
                      width: '100%',
                      height: 60,
                      borderRadius: '10px',
                      minWidth: 0,
                      fontSize: '18px',
                      backgroundColor: isSelected ? '#d32f2f' : '#fdf1dc',
                      border: isSelected
                        ? '2px solid #fdf1dc'
                        : '2px dashed #d32f2f',
                      color: isSelected ? '#fdf1dc' : '#d32f2f',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        backgroundColor: isSelected ? '#d32f2f' : '#fdf1dc',
                        border: isSelected
                          ? '2px solid #fdf1dc'
                          : '2px dashed #d32f2f',
                        borderRadius: '50%',
                      },
                      '&::before': {
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      },
                      '&::after': {
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: isSelected ? '#fdf1dc' : '#d32f2f' }}
                    >
                      {ticket.ticket_number}
                    </Typography>
                  </Button>
                </Grid2>
              );
            })
          ) : (
            <Typography variant="body1" textAlign="center">
              No hay tickets disponibles
            </Typography>
          )}
        </Grid2>

        <Box className="containerPagination">
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{ mr: 2 }}
          >
            Atras
          </Button>
          <Typography variant="body1" sx={{ alignSelf: 'center', mx: 2 }}>
            Página {currentPage} de {totalPages}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              sx={{ mr: 2 }}
            >
              Siguiente
            </Button>
            <FormControl variant="outlined" sx={{ minWidth: 80 }}>
              <InputLabel id="tickets-per-page-label">Tickets</InputLabel>
              <Select
                labelId="tickets-per-page-label"
                value={ticketsPerPage}
                onChange={handleTicketsPerPageChange}
                label="Tickets"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ backgroundColor: '#fff', p: 3 }}
      >
        {/* Card con animación de cambio de hoja */}
        {filteredTickets.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex} // Importante para que se anime con cada cambio
              initial={{ x: 100, opacity: 0 }} // Empieza fuera de la pantalla
              animate={{ x: 0, opacity: 1 }} // Aparece con animación
              exit={{ x: -100, opacity: 0 }} // Se desliza hacia atrás
              transition={{ duration: 0.5 }} // Control de la velocidad
              style={{ position: 'relative' }}
            >
              <Paper
                elevation={3}
                sx={{
                  mt: 4,
                  p: 3,
                  borderLeft: '2px dashed #d32f2f',
                  borderRadius: 2,
                  textAlign: 'center',
                  width: '320px',
                  backgroundColor: '#fdf1dc',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Simulación de la boleta anterior */}
                {currentIndex > 0 && (
                  <motion.div
                    initial={{ scale: 1, rotateY: 0, opacity: 0.5 }}
                    animate={{ scale: 0.9, rotateY: 180, opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      bottom: '10px',
                      backgroundColor: '#fdf1dc',
                      borderRadius: '5px',
                      border: '2px dashed #d32f2f',
                      zIndex: -1,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color: '#d32f2f',
                        border: '2px solid #d32f2f',
                        display: 'inline-block',
                        px: 2,
                        py: 1,
                        mt: 1,
                        backgroundColor: '#fff',
                      }}
                    >
                      {tickets[currentIndex - 1].ticket_number}
                    </Typography>
                  </motion.div>
                )}

                <Typography variant="h5" color="error" fontWeight="bold" mb={2}>
                  {raffle['name']}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Juega el 15 de junio de 2025
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Con las dos últimas cifras del Premio Mayor de la Lotería de
                  medellín
                </Typography>

                <Typography variant="h6" mt={2} fontWeight="bold">
                  Número de Ticket:
                </Typography>
                {selectedTickets.length > 0 ? (
                  selectedTickets.map((ticket) => (
                    <Typography
                      key={ticket.id}
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color: '#d32f2f',
                        border: '2px solid #d32f2f',
                        display: 'inline-block',
                        px: 2,
                        py: 1,
                        mt: 1,
                        backgroundColor: '#fff',
                      }}
                    >
                      {ticket.ticket_number}
                    </Typography>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    mt={2}
                  >
                    Ningún ticket seleccionado
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" mt={2}>
                {t('unpaid_ticket')}
                  <br />
                  Total:{' '}
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                  }).format(totalPrice)}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const selectedInCurrentPage = currentTickets.some((ticket) =>
                      selectedTickets.some((t) => t.id === ticket.id)
                    );

                    if (!selectedInCurrentPage) {
                      errorAlert({
                        messageKey: 'please_select_ticket_first',
                      });
                      return;
                    }

                    handleClickOpen(currentIndex);
                    setOpenModal(true);
                  }}
                  sx={{ mt: 2 }}
                >
                  {t('reserve')}
                </Button>

              </Paper>
            </motion.div>
          </AnimatePresence>
        )}
      </Box>

      <TicketFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onSubmit={onSubmit}

        initialValues={tickets || { name: '' }}
        selectedTickets={selectedTickets}
        setSelectedTickets={setSelectedTickets}
        selectedTicketNumbers={selectedTicketNumbers}
        totalPrice={totalPrice}
        tickets={tickets}
      />
    </Box>
  );
};

export default TicketsPage;
