import { useEffect } from 'react';
import TicketsPage from '../../pages/tickets/TicketsPage';
import { useTickets } from '../../hooks/tickets/useTickets';
import { useSearch } from '../../hooks/generic/useSearch';

const TicketsContainer = () => {
  const { tickets, loading, loadTickets, handleEditTicket, handleDeleteTicket } = useTickets();
  const { searchQuery, setSearchQuery, filteredData: filteredTickets } = useSearch(tickets, ['ticketNumber']);

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <TicketsPage
      tickets={filteredTickets}
      loading={loading}
      onEdit={handleEditTicket}
      onDelete={handleDeleteTicket}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
};

export default TicketsContainer;
