import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const TicketsPage = ({
  tickets,
  //loading,
  //onEdit,
  //onDelete,
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useTranslation();

  /**
   * State variable to manage the open/close state.
   * @type {boolean}
   */
  const [open, setOpen] = useState(false);

  /**
   * State to hold the currently selected ticket.
   * @type {[Object|null, Function]} selectedTicket - The selected ticket object or null if no ticket is selected.
   * @type {Function} setSelectedTicket - Function to update the selected ticket state.
   */
  const [selectedTicket, setSelectedTicket] = useState(null);

  /**
   * State variable to keep track of the current index.
   * @type {[number, Function]}
   */
  const [currentIndex, setCurrentIndex] = useState(0);


  /**
   * State variable to keep track of the current page number.
   * @type {number}
   */
  const [ticketsPerPage, setTicketsPerPage] = useState(5);

  /**
   * State variable to keep track of the index of the selected button.
   * @type {[number|null, Function]}
   */
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  /**
   * Handles the click event to open a ticket.
   * Sets the selected ticket based on the provided index and opens the dialog.
   *
   * @param {number} index - The index of the ticket to be selected.
   */
  const handleClickOpen = (index) => {
    setSelectedTicket(tickets[index]);
    setOpen(true);
  };

  /**
   * Handles the closing of a modal or dialog.
   * Sets the state to close the modal and clears the selected ticket.
   */
  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  /**
   * Advances to the next ticket in the list.
   * Updates the current index and the selected button index.
   * If the current index is at the end of the list, it wraps around to the beginning.
   */
  const handleNextTicket = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % tickets.length;
      setSelectedButtonIndex(newIndex);
      return newIndex;
    });
  };

  /**
   * Handles the action of reversing the ticket selection.
   * If the current index is greater than 0, it decrements the current index
   * and updates the selected button index accordingly.
   */
  const handleReverseTicket = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex - 1) % tickets.length;
        setSelectedButtonIndex(newIndex);
        return newIndex;
      });
    }
  };

  // Función para seleccionar un ticket en la lista de tickets
  const handleSelectTicket = (index) => {
    // Acutalizar el índice del ticket actual al indice seleccionado
    setCurrentIndex(index);
    // Establecer el botón seleccionado en base al índice seleccionado
    setSelectedButtonIndex(index);
  };

  // Funcion para manejar la navegacion de los tickets por página
  const handleNextPage = () => {
    // Actualiza el estado 'currentPage' incrementando en 1 el valor actual
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Funcion para devolverse en la navegacion de los tickets por página
  const handlePreviousPage = () => {
    // Actualiza el estado 'currentPage' decrementando en 1 el valor actual
    // pero asegurándose de que no sea menor que 1
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Funcion para manejar el cambio de la cantidad de tickets por página
  const handleTicketsPerPageChange = (event) => {
    // Actualiza el estado 'ticketsPerPage' con el valor seleccionado
    setTicketsPerPage(event.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando se cambia el número de tickets por página
  };

  // Filtrar los tickets basados en el searchQuery
  const filteredTickets = tickets.filter((ticket) => {
    // Convertir el numero de ticket a string y convertirlo a minúsculas
    const ticketNumber = ticket.ticket_number?.toString().toLowerCase();
    // Verificar si el número de ticket incluye el término de búsqueda en minúsculas
    return ticketNumber.includes(searchQuery.toLowerCase());
  });

  // Calcular el indice de inicio para la pagina actual
  const startIndex = (currentPage - 1) * ticketsPerPage;
  // Calcular el indice fin para la pagina actual
  const endIndex = startIndex + ticketsPerPage;
  // Obetner los tickets que se deben de mostrar en la pagina actual
  const currentTickets = filteredTickets.slice(startIndex, endIndex);
  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h4" gutterBottom textAlign="center" flexGrow={1}>
          {t('tickets')}
        </Typography>
      </Box>

      {/* Barra de búsqueda de tickets */}
      <Box display="flex" justifyContent="flex-start" mb={5}>
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder={t('search_placeholder_ticket')}
        />
      </Box>

      {/* Botones de tickets */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginTop={-12}
      >
        <Grid container spacing={2} maxWidth={500} justifyContent="center">
          {/* Verifica si hay tickets disponibles en la pagina actual, antes de renderizalos. */}
          {currentTickets && currentTickets.length > 0 ? (
            currentTickets.map((ticket, index) => (
              <Grid item key={ticket.id} xs={6} sm={4} md={3} lg={2}>
                <Button
                  variant="contained"
                  onClick={() => handleSelectTicket(startIndex + index)} //Calcula el indice del ticket en la lsta completa de tickets.
                  sx={{
                    width: '100%',
                    height: 60,
                    borderRadius: '10px',
                    minWidth: 0,
                    fontSize: '18px',
                    backgroundColor: '#fdf1dc',
                    border: '2px dashed #d32f2f',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#fdf1dc',
                      border: '2px dashed #d32f2f',
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
                  disabled={selectedButtonIndex === startIndex + index} // Deshabilitar el botón si está seleccionado
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: '#d32f2f' }}
                  >
                    {ticket.ticket_number}
                  </Typography>
                </Button>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" textAlign="center">
              No hay tickets disponibles
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Paginación de tickets */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{ mr: 2 }}
        >
          Anterior
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

      {/* Tarjeta de tickets */}
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
                  GRAN RIFA DE MOTO NMAX
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
                  {tickets[currentIndex].ticket_number}
                </Typography>

                <Typography variant="body2" color="textSecondary" mt={2}>
                  Boleta sin cancelar no participa en el sorteo.
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReverseTicket}
                  sx={{ mt: 2 }}
                  disabled={currentIndex === 0} // Deshabilitar el botón si está en el primer ticket
                >
                  Anterior
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextTicket}
                  sx={{ mt: 2 }}
                >
                  Siguiente
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(currentIndex)}
                  sx={{ mt: 2 }}
                >
                  Reservar
                </Button>
              </Paper>
            </motion.div>
          </AnimatePresence>
        )}
      </Box>

      {/* Dialog para mostrar información del ticket seleccionado */}
      <Dialog open={open} onClose={handleClose}>
        <Card>
          <CardContent style={{ textAlign: 'center' }}>
            {selectedTicket && (
              <>
                <h3>Ticket ID: {selectedTicket.id}</h3>
                <h4>Número de Ticket: {selectedTicket.ticket_number}</h4>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Inciar sesión
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  style={{ marginLeft: 10 }}
                >
                  Ingresa con Google
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Dialog>

      {/* <TicketsTable rows={tickets || []} pageSize={pageSize} loading={loading} onEdit={onEdit} onDelete={onDelete} /> */}
    </Box>
  );
};

export default TicketsPage;
