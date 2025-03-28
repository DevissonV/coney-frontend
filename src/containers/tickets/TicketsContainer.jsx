import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketsPage from '../../pages/tickets/TicketsPage';
import TicketFormModal from '../../components/tickets-components/TicketFormModal';
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
    //loadAllTickets,
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
    selectedTicketNumbers,
    handleReservedTickets,
  } = useTickets();
  const {
    searchQuery,
    setSearchQuery,
    //filteredData: filteredTicketss,
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
      onSubmit={(id, ticketData) => {
        setOpenModal(false);
        handleReservedTickets(id, ticketData);
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
      filteredTickets={filteredTickets}
      currentTickets={currentTickets}
      startIndex={startIndex}
      endIndex={endIndex}
      totalPages={totalPages}
      selectedTickets={selectedTickets}
      setSelectedTickets={setSelectedTickets}
      totalPrice={totalPrice}
      selectedTicketNumbers={selectedTicketNumbers}
    />
  );
};

export default TicketsContainer;
