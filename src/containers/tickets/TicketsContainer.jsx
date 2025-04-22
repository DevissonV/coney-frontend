import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketsPage from '../../pages/tickets/TicketsPage';
import { useTickets } from '../../hooks/tickets/useTickets';
import { useSearch } from '../../hooks/generic/useSearch';

const TicketsContainer = () => {
  const { riffleId } = useParams();
  const {
    tickets,
    raffle,
    loading,
    selectedTicket,
    selectedTickets,
    setSelectedTickets,
    open,
    currentIndex,
    currentPage,
    ticketsPerPage,
    selectedButtonIndex,
    loadTickets,
    searchraffleById,
    handleEditTicket,
    handleDeleteTicket,
    handleClickOpen,
    handleClose,
    handleNextTicket,
    handleReverseTicket,
    handleSelectTicket,
    handleNextPage,
    handlePreviousPage,
    handleTicketsPerPageChange,
    filteredTickets,
    startIndex,
    endIndex,
    currentTickets,
    totalPages,
    totalPrice,
    handleReservedTickets,
  } = useTickets();
  const {
    searchQuery,
    setSearchQuery,
  } = useSearch(tickets, ['ticket_number']);
  useEffect(() => {
    loadTickets(riffleId);
    searchraffleById(riffleId);
  }, [riffleId]);

  const [openModal, setOpenModal] = useState(false);
  const [ticketUpdate, setTicketUpdate] = useState(null);

  const onEdit = (ticketData) => {
    handleEditTicket({ ...ticketData, riffleId });
  };

  const onDelete = (ticketId) => {
    handleDeleteTicket(ticketId, riffleId);
  };

  return (
    <TicketsPage
      tickets={filteredTickets}
      raffle={raffle}
      onSubmit={async ({ ticketId, userId }) => {
        return await handleReservedTickets({ ticketId, userId });
      }}
      onCreate={handleReservedTickets}
      openModal={openModal}
      setOpenModal={setOpenModal}
      ticketUpdate={ticketUpdate}
      setTicketUpdate={setTicketUpdate}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      currentPage={currentPage}
      ticketsPerPage={ticketsPerPage}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
      handleTicketsPerPageChange={handleTicketsPerPageChange}
      handleClose={handleClose}
      selectedTicket={selectedTicket}
      open={open}
      selectedButtonIndex={selectedButtonIndex}
      currentIndex={currentIndex}
      handleReverseTicket={handleReverseTicket}
      handleNextTicket={handleNextTicket}
      handleSelectTicket={handleSelectTicket}
      handleClickOpen={handleClickOpen}
      currentTickets={currentTickets}
      startIndex={startIndex}
      endIndex={endIndex}
      totalPages={totalPages}
      selectedTickets={selectedTickets}
      setSelectedTickets={setSelectedTickets}
      totalPrice={totalPrice}
      selectedTicketNumbers={selectedTickets.map(t => t.ticket_number).join(', ')}
      loadTickets={loadTickets}
    />
  );
};

export default TicketsContainer;
