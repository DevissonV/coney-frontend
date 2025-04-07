import { useEffect } from 'react';
import PaymentsPage from '../../pages/payments/PaymentsPage';
import { usePayments } from '../../hooks/payments/usePayments';
import { useSearch } from '../../hooks/generic/useSearch';

const PaymentsContainer = () => {
  const { payments, loadPayments } = usePayments();

  /**
   * Filters a list of payments based on a search query.
   *
   * @param {Object} payments - The payment object to filter.
   * @param {string} query - The search query string to match against.
   * @returns {boolean} - Returns true if the payment matches the query, otherwise false.
   *
   * The function checks if the query is included in either:
   * - The raffle name (case-insensitive).
   * - The buyer's full name (case-insensitive).
   */
  const filterFn = (payments, query) => {
    const nameRaffle = payments.raffle?.name?.toLowerCase() || '';
    const buyerName = `${payments.tickets?.[0]?.user?.first_name || ''} ${
      payments.tickets?.[0]?.user?.last_name || ''
    }`.toLowerCase();
    return nameRaffle.includes(query) || buyerName.includes(query);
  };

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredPayments,
  } = useSearch(payments, filterFn);

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <PaymentsPage
      payments={filteredPayments}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
};

export default PaymentsContainer;
