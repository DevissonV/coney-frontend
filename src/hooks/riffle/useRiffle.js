import { useState } from 'react';
import {
  fetchRaffle,
  createRaffles,
  editRiffle,
  deleteRiffle,
} from '../../services/riffle/RiffleService';
import {
  errorAlert,
  toast,
  confirmDelete,
} from '../../services/generic/AlertService';

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
  const handleCreateRaffle = async (raffleData) => {
    try {
      await createRaffles(raffleData);
      setLoading(true);
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
  const handleEditRiffle = async (id, riffleData) => {
    try {
      await editRiffle(id, riffleData);
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

  return {
    riffle,
    loading,
    loadRaffle,
    handleCreateRaffle,
    handleEditRiffle,
    handleDeleteRiffle,
  };
};
