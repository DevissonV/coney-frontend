import { useState } from 'react';
import { fetchTickets, createTicket, editTicket, deleteTicket } from '../../services/tickets/TicketService';
import { 
  errorAlert, 
  toast, 
  confirmDelete,
  confirmReservation
} from '../../services/generic/AlertService';

export const useTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (error) {
      errorAlert({ messageKey: 'error_loading_tickets' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      await createTicket(ticketData);
      toast({ icon: 'success', titleKey: 'create_success' });
      loadTickets();
    } catch (error) {
      errorAlert({ messageKey: 'error_creating_ticket' });
    }
  };

  const handleEditTicket = async (id, ticketData) => {
      const result = await confirmReservation({
        titleKey: 'confirm_reservation_title', 
        messageKey: 'confirm_reservation_message'
      });
      
      await deleteTicket(id);
      loadTickets();
      toast({ icon: 'success', titleKey: 'reservation_success' });

  };  

  const handleDeleteTicket = async (id) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title', 
      messageKey: 'confirm_delete_message'
    });
  
    if (result.isConfirmed) { 
      try {
        await deleteTicket(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        loadTickets();
      } catch (error) {
        errorAlert({ messageKey: 'error_deleting_ticket' });
      }
    } 
  };

  return {
    tickets,
    loading,
    loadTickets,
    handleCreateTicket,
    handleEditTicket,
    handleDeleteTicket,
  };
};
