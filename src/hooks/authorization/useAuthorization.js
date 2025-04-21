import { useEffect, useState } from 'react';
import {
  getAuthorizationByRaffle,
  createAuthorization,
  uploadAuthorizationDocument,
  deleteAuthorization,
  deleteAuthorizationDocument,
} from '../../services/authorization/AuthorizationService';
import {
  errorAlert,
  toast,
  confirmDelete,
} from '../../services/generic/AlertService';
import useAuthStore from '../../stores/auth/useAuthStore';

/**
 * Hook to manage authorization logic by raffle.
 */
export const useAuthorization = (raffleId) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [authorization, setAuthorization] = useState(null);

  /**
   * Loads the authorization by raffle ID.
   */
  const loadAuthorization = async () => {
    try {
      setLoading(true);
      const data = await getAuthorizationByRaffle(raffleId);
      setAuthorization(data);
    } catch {
      errorAlert({ messageKey: 'error_fetch_authorization' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new authorization for this raffle.
   * @param {Object} payload - { ticketText }
   */
  const handleCreateAuthorization = async (payload) => {
    try {
      const data = await createAuthorization({
        raffleId,
        ticketText: payload.ticketText,
        createdBy: user.id,
      });
      toast({ icon: 'success', titleKey: 'create_success' });
      setAuthorization(data);
    } catch {
      errorAlert({ messageKey: 'error_creating_authorization' });
    }
  };

  /**
   * Uploads a document associated with the current authorization.
   * @param {File} file
   * @param {string} type - Type of the document
   */
  const handleUploadDocument = async (file, type) => {
    if (!authorization?.id) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('raffleId', raffleId);

    try {
      const document = await uploadAuthorizationDocument(formData, raffleId);
      toast({ icon: 'success', titleKey: 'upload_success' });
      setAuthorization((prev) => ({
        ...prev,
        documents: [...(prev.documents || []), document],
      }));
    } catch {
      errorAlert({ messageKey: 'error_uploading_document' });
    }
  };

  /**
   * Deletes the current authorization.
   */
  const handleDeleteAuthorization = async () => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title',
      messageKey: 'confirm_delete_authorization',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAuthorization(authorization.id);
      toast({ icon: 'success', titleKey: 'delete_success' });
      setAuthorization(null);
    } catch {
      errorAlert({ messageKey: 'error_deleting_authorization' });
    }
  };

  /**
   * Deletes the documents.
   */
  const handleDeleteDocument = async (docId) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title',
      messageKey: 'confirm_delete_document',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAuthorizationDocument(docId);
      toast({ icon: 'success', titleKey: 'delete_success' });
      setAuthorization((prev) => ({
        ...prev,
        documents: prev.documents.filter((d) => d.id !== docId),
      }));
    } catch {
      errorAlert({ messageKey: 'error_deleting_document' });
    }
  };

  useEffect(() => {
    if (raffleId) loadAuthorization();
  }, [raffleId]);

  return {
    authorization,
    loading,
    handleCreateAuthorization,
    handleUploadDocument,
    handleDeleteAuthorization,
    handleDeleteDocument,
  };
};
