import { useState } from 'react';
import { fetchRiffle, createRiffle, editRiffle, deleteRiffle } from '../../services/riffle/RiffleService';
import { errorAlert, toast, confirmDelete } from '../../services/generic/AlertService';

export const useRiffle = () => {
  const [loading, setLoading] = useState(true);
  const [riffle, setRiffle] = useState([]);

  const loadRiffle = async () => {
    setLoading(true);
    try {
      const data = await fetchRiffle();
      setRiffle(data);
    } catch (error) {
      errorAlert({ messageKey: 'error_loading_riffle' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRiffle = async (riffleData) => {
    try {
      await createRiffle(riffleData);
      toast({ icon: 'success', titleKey: 'create_success' });
      loadRiffle();
    } catch (error) {
      errorAlert({ messageKey: 'error_creating_riffle' });
    }
  };

  const handleEditRiffle = async (id, riffleData) => {
    try {
      await editRiffle(id, riffleData);
      toast({ icon: 'success', titleKey: 'edit_success' });
      loadRiffle();
    } catch (error) {
      errorAlert({ messageKey: 'error_updating_riffle' });
    }
  };

  const handleDeleteRiffle = async (id) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title', 
      messageKey: 'confirm_delete_message'
    });
  
    if (result.isConfirmed) { 
      try {
        await deleteRiffle(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        loadRiffle();
      } catch (error) {
        errorAlert({ messageKey: 'error_deleting_riffle' });
      }
    } 
  };

  return {
    riffle,
    loading,
    loadRiffle,
    handleCreateRiffle,
    handleEditRiffle,
    handleDeleteRiffle,
  };
};
