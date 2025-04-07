import { useEffect } from 'react';
import PaymentsPage from '../../pages/payments/PaymentsPage';
import { usePayments } from '../../hooks/payments/usePayments';
import { useSearch } from '../../hooks/generic/useSearch';

const PaymentsContainer = () => {
  const { payments, loadPayments } = usePayments();
  const { filteredData: filteredPayments } = useSearch(payments, ['raffle.name', 'created_by.first_name']);

  useEffect(() => {
    loadPayments();
  }, []);

  return <PaymentsPage payments={filteredPayments} />;
};

export default PaymentsContainer;
