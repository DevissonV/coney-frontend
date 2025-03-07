import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketsPage from '../../pages/tickets/TicketsPage';
import { useTickets } from '../../hooks/tickets/useTickets';
import { useSearch } from '../../hooks/generic/useSearch';

const TicketsContainer = () => {
  const { riffleId } = useParams();
  const {
    tickets,
    loading,
    loadTickets,
    handleEditTicket,
    handleDeleteTicket,
  } = useTickets();
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredTickets,
  } = useSearch(tickets, ['ticket_number']);
  useEffect(() => {
    loadTickets(riffleId);
  }, [riffleId]);

  const onEdit = (ticketData) => {
    handleEditTicket({ ...ticketData, riffleId });
  };

  const onDelete = (ticketId) => {
    handleDeleteTicket(ticketId, riffleId);
  };

  return (
    <TicketsPage
      tickets={filteredTickets}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
};

export default TicketsContainer;
