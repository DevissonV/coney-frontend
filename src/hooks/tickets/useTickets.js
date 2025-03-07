import { useState } from 'react';
import {
  fetchTickets,
  editTicket,
  deleteTicket,
  fetchTicketsByRiffle,
} from '../../services/tickets/TicketService';
import {
  errorAlert,
  toast,
  confirmDelete,
  confirmReservation,
} from '../../services/generic/AlertService';
import useAuthStore from '../../stores/auth/useAuthStore';

/**
 * Custom hook to manage ticket-related operations.
 * @returns {Object} Ticket management functions.
 */
export const useTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const { user } = useAuthStore();

  /**
   * Loads tickets for a specific riffle.
   * @param {number} riffleId - The ID of the riffle.
   */
  const loadTickets = async (riffleId) => {
    setLoading(true);
    try {
      const data = await fetchTicketsByRiffle(riffleId);
      setTickets(data);
    } catch {
      errorAlert({ messageKey: 'error_loading_tickets' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Loads all available tickets.
   */
  const loadAllTickets = async () => {
    setLoading(true);
    try {
      await fetchTickets();
    } catch {
      errorAlert({ messageKey: 'error_loading_tickets' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Edits a ticket after confirming the reservation.
   * @param {Object} ticketData - The ticket data to edit.
   * @param {number} ticketData.id - The ID of the ticket.
   * @param {number} ticketData.ticketNumber - The ticket number.
   * @param {number} ticketData.riffleId - The associated riffle ID.
   */
  const handleEditTicket = async (ticketData) => {
    const result = await confirmReservation({
      titleKey: 'confirm_reservation_title',
      messageKey: 'confirm_reservation_message',
      ticketNumber: ticketData.ticketNumber,
    });

    if (result.isConfirmed) {
      try {
        const updatedTicketData = {
          ticketNumber: ticketData.ticketNumber,
          riffleId: ticketData.riffleId,
          userId: user.id,
        };
        await editTicket(ticketData.id, updatedTicketData);
        toast({ icon: 'success', titleKey: 'edit_success' });
        await loadTickets(ticketData.riffleId);
      } catch {
        errorAlert({ messageKey: 'error_updating_ticket' });
      }
    }
  };

  /**
   * Deletes a ticket after user confirmation.
   * @param {number} id - The ID of the ticket to delete.
   * @param {number} riffleId - The associated riffle ID.
   */
  const handleDeleteTicket = async (id, riffleId) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title',
      messageKey: 'confirm_delete_message',
    });

    if (result.isConfirmed) {
      try {
        await deleteTicket(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        await loadTickets(riffleId);
      } catch {
        errorAlert({ messageKey: 'error_deleting_ticket' });
      }
    }
  };

  return {
    tickets,
    loading,
    loadTickets,
    handleEditTicket,
    handleDeleteTicket,
    loadAllTickets,
  };
};
