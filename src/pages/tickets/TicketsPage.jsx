import { useState } from "react";
import { Box, Typography, Button, Card, CardContent, Grid, Dialog, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import SearchToolbar from "../../components/generic/search-toolbar/SearchToolbar";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const TicketsPage = ({ tickets, loading, onEdit, onDelete, searchQuery, onSearchChange }) => {
  const { t } = useTranslation();

  /** Open Es una variable de estado que controla si el modal (diálogo) está abierto o cerrado.
   * setOpen Es una función que se utiliza para actualizar el estado de open.
   * useState(false) Establece el valor inicial de open como false, lo que significa que el modal está cerrado inicialmente.
   */
  const [open, setOpen] = useState(false);

  /**selectedTicket Es una variable de estado que mantiene la información del ticket actualmente seleccionado.
   * setSelectedTicket Es una función que se utiliza para actualizar el estado de selectedTicket.
   * useState(null) Establece el valor inicial de selectedTicket como null, lo que significa que no hay ningún ticket seleccionado inicialmente.
   */
  const [selectedTicket, setSelectedTicket] = useState(null);

  /**Estado para el índice del ticket actual en la lista de tickets
   * currentIndex: Es una variable de estado que mantiene el índice del ticket actualmente seleccionado o mostrado.
   * setCurrentIndex: Es una función que se utiliza para actualizar el estado de currentIndex.
   * useState(0): Establece el valor inicial de currentIndex como 0, lo que significa que inicialmente se selecciona el primer ticket en la lista.
  */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**Estado para la página actual de la lista de tickets 
   * currentPage:Es una variable de estado que mantiene el número de la página actual en la lista de tickets.
   * setCurrentPage:Es una función que se utiliza para actualizar el estado de currentPage.
   * useState(1):Establece el valor inicial de currentPage como 1, lo que significa 
   * que inicialmente se muestra la primera página de la lista de tickets.
  */
  const [currentPage, setCurrentPage] = useState(1);

  /** Estado para el número de tickets por página 
   * ticketsPerPage: Es una variable de estado que mantiene el número de tickets que se deben mostrar por página.
   * setTicketsPerPage: Es una función que se utiliza para actualizar el estado de ticketsPerPage.
   * useState(5): Establece el valor inicial de ticketsPerPage como 5, lo que significa que inicialmente se muestran 5 tickets por página.
   */
  const [ticketsPerPage, setTicketsPerPage] = useState(5);

  /**Estado para el botón seleccionado en la lista de tickets
   * selectedButtonIndex: Es una variable de estado que mantiene el índice del botón de ticket actualmente seleccionado.
   * setSelectedButtonIndex: Es una función que se utiliza para actualizar el estado de selectedButtonIndex.
   * useState(null): Establece el valor inicial de selectedButtonIndex como null, lo que significa que no hay ningún botón seleccionado inicialmente.
   */
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  // Funcion para abrir el modal (dialog) con la información del ticket seleccionado
  const handleClickOpen = (index) => {
    // Establecer el ticket seleccionado y abrir el modal en base al indice seleccionado
    setSelectedTicket(tickets[index]);
    // Abre el modal estableciendo el estado 'open' a true
    setOpen(true);
  };

  // Funcion para cerrar el modal (dialog)
  const handleClose = () => {
    // Cierra el modal estableciendo el estado 'open' a false
    setOpen(false);
    // Limpia el ticket seleccionado estableciendo el estado 'selectedTicket' a null
    setSelectedTicket(null);
  };

  // Funciones para navegar dentro de la tarjeta de los tickets 
  const handleNextTicket = () => {
    // Acutalizar el índice del ticket actual
    setCurrentIndex((prevIndex) => {
      // Calcular el nuevo índice del ticket
      const newIndex = (prevIndex + 1) % tickets.length;
      // Estabece el nuevo indice el boton seleccionado (esto es un hook para manejar estados de react)
      setSelectedButtonIndex(newIndex);
      // Retorna el nuevo indice para actualizar el estado
      return newIndex;
    });
  };

  // Funcion para devolverse en la tarjeta de los tickets cuando se presiona el boton 'Anterior'
  const handleReverseTicket = () => {
    // Verifica si el indice actual es mayor a 0 para no retroceder más allá del primer ticket
    if (currentIndex > 0) {
      // Actualiza el indice del ticket actual
      setCurrentIndex((prevIndex) => {
        // Calcula el nuevo índice del ticket restando 1 al índice anterior y utilizando el operador 
        // módulo (%) para asegurarse de que el índice se mantenga dentro del rango de la lista de tickets.
        const newIndex = (prevIndex - 1) % tickets.length;
        // Establece el nuevo indice del boton seleccionado
        setSelectedButtonIndex(newIndex);
        // Retorna el nuevo indice para actualizar el estado
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
        <SearchToolbar searchQuery={searchQuery} onSearchChange={onSearchChange} placeholder={t("search_placeholder_ticket")} />
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
                    width: "100%",
                    height: 60,
                    borderRadius: "10px",
                    minWidth: 0,
                    fontSize: "18px",
                    backgroundColor: "#fdf1dc",
                    border: "2px dashed #d32f2f",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    '&::before, &::after': {
                      content: '""',
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#fdf1dc",
                      border: "2px dashed #d32f2f",
                      borderRadius: "50%",
                    },
                    '&::before': {
                      top: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                    '&::after': {
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                  }}
                  disabled={selectedButtonIndex === startIndex + index} // Deshabilitar el botón si está seleccionado
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#d32f2f" }}>
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
        sx={{ backgroundColor: "#fff", p: 3 }}
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
              style={{ position: "relative" }}
            >
              <Paper
                elevation={3}
                sx={{
                  mt: 4,
                  p: 3,
                  borderLeft: "2px dashed #d32f2f",
                  borderRadius: 2,
                  textAlign: "center",
                  width: "320px",
                  backgroundColor: "#fdf1dc",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Simulación de la boleta anterior */}
                {currentIndex > 0 && (
                  <motion.div
                    initial={{ scale: 1, rotateY: 0, opacity: 0.5 }}
                    animate={{ scale: 0.9, rotateY: 180, opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      right: "10px",
                      bottom: "10px",
                      backgroundColor: "#fdf1dc",
                      borderRadius: "5px",
                      border: "2px dashed #d32f2f",
                      zIndex: -1,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color: "#d32f2f",
                        border: "2px solid #d32f2f",
                        display: "inline-block",
                        px: 2,
                        py: 1,
                        mt: 1,
                        backgroundColor: "#fff",
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
                  Con las dos últimas cifras del Premio Mayor de la Lotería de medellín
                </Typography>

                <Typography variant="h6" mt={2} fontWeight="bold">
                  Número de Ticket:
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    color: "#d32f2f",
                    border: "2px solid #d32f2f",
                    display: "inline-block",
                    px: 2,
                    py: 1,
                    mt: 1,
                    backgroundColor: "#fff",
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
          <CardContent style={{ textAlign: "center" }}>
            {selectedTicket && (
              <>
                <h3>Ticket ID: {selectedTicket.id}</h3>
                <h4>Número de Ticket: {selectedTicket.ticket_number}</h4>
                <Button variant="contained" color="primary" onClick={handleClose}>
                  Inciar sesión
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClose} style={{ marginLeft: 10 }}>
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