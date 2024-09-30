import { useEffect, useState } from 'react';
import TicketsPage from '../../pages/tickets/TicketsPage';
import { useTickets } from '../../hooks/tickets/useTickets';
import { useSearch } from '../../hooks/generic/useSearch';

const TicketsContainer = () => {
  const { 
    tickets, 
    loading, 
    loadTickets, 
    handleCreateTicket, 
    handleDeleteTicket,
    handleEditTicket 
  } = useTickets();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: filteredTickets 
  } = useSearch(tickets, ['ticketNumber']);
  
  const [openModal, setOpenModal] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <TicketsPage
      tickets={filteredTickets} 
      loading={loading}
      onCreate={handleCreateTicket}
      onEdit={(ticket) => {
        setTicketToEdit(ticket); 
        setOpenModal(true); 
      }}
      onDelete={handleDeleteTicket}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      openModal={openModal}
      setOpenModal={setOpenModal}
      ticketToEdit={ticketToEdit}
      setTicketToEdit={setTicketToEdit}
      onSubmit={(ticketData) => {
        if (ticketToEdit) {
          handleEditTicket(ticketToEdit.id, ticketData); 
        } else {
          handleCreateTicket(ticketData);
        }
        setOpenModal(false); 
      }}
    />
  );
};

export default TicketsContainer;
