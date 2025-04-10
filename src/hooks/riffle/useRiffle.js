import { useState } from 'react';
import {
  fetchRaffle,
  createRaffles,
  editRiffle,
  deleteRiffle,
  selectWinner,
} from '../../services/riffle/RiffleService';
import {
  errorAlert,
  toast,
  confirmDelete,
  showWinnerModal,
} from '../../services/generic/AlertService';
import { getUserById } from '../../services/users/UserService';
import { ticketById } from '../../services/tickets/TicketService';
import { validateExpiredPayments } from '../../services/payments/paymentService';

/**
 * Custom hook to manage riffle-related operations.
 * @returns {Object} Riffle management functions.
 */
export const useRiffle = () => {
  const [loading, setLoading] = useState(true);
  const [riffle, setRiffle] = useState([]);

  /**
   * Loads all raffles.
   */
  const loadRaffle = async () => {
    setLoading(true);
    try {
      await validateExpiredPayments();

      const data = await fetchRaffle();

      setRiffle(data);
    } catch {
      errorAlert({ messageKey: 'error_loading_riffle' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new riffle.
   * @param {Object} raffleData - The data for the new riffle.
   */
  const handleCreateRaffle = async (raffleData, photo = null) => {
    try {
      const createdRaffle = await createRaffles(raffleData, photo);
      toast({ icon: 'success', titleKey: 'create_success' });
      loadRaffle();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error creating raffle';
      errorAlert({ messageKey: errorMessage });
    }
  };

  /**
   * Edits an existing riffle.
   * @param {number} id - The ID of the riffle to edit.
   * @param {Object} riffleData - The updated riffle data.
   */
  const handleEditRiffle = async (id, riffleData, photo = null) => {
    try {
      await editRiffle(id, riffleData, photo);
      toast({ icon: 'success', titleKey: 'edit_success' });
      loadRaffle();
    } catch {
      errorAlert({ messageKey: 'error_updating_riffle' });
    }
  };

  /**
   * Deletes a riffle after confirmation.
   * @param {number} id - The ID of the riffle to delete.
   */
  const handleDeleteRiffle = async (id) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title',
      messageKey: 'confirm_delete_message',
    });

    if (result.isConfirmed) {
      try {
        await deleteRiffle(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        loadRaffle();
      } catch {
        errorAlert({ messageKey: 'error_deleting_riffle' });
      }
    }
  };

  const handleWinner = async (raffleId) => {
    const idRaffle = raffleId.id;
    try {
      const winner = await selectWinner(idRaffle);
      setLoading(true);
      loadRaffle();

      const user = await getUserById(winner.user_id);
      const ticket = await ticketById(winner.ticket_id);

      await showWinnerModal({
        firstName: user.first_name,
        lastName: user.last_name,
        ticketNumber: ticket.ticket_number,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'error_selected_winner';
      errorAlert({ messageKey: errorMessage });
    }
  };

  return {
    riffle,
    loading,
    loadRaffle,
    handleCreateRaffle,
    handleEditRiffle,
    handleDeleteRiffle,
    handleWinner,
  };
};
