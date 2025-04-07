import { useState } from 'react';
import { fetch } from '../../services/payments/paymentService';
import { errorAlert } from '../../services/generic/AlertService';

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await fetch();
      setPayments(data);
    } catch {
      errorAlert({ messageKey: 'error_loading_payments' });
    } finally {
      setLoading(false);
    }
  };

  return {
    payments,
    loadPayments,
    loading,
  };
};
