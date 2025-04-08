import { useEffect, useState } from 'react';
import WinnersPage from '../../pages/winners/WinnersPage';
import { useWinners } from '../../hooks/winners/useWinners';
import { useSearch } from '../../hooks/generic/useSearch';
import { errorAlert } from '../../services/generic/AlertService.js';

const WinnersContainer = () => {
  const { winners, loadWinners } = useWinners();
  const [loading, setLoading] = useState(true);

  /**
   * Filters a winner object based on a query string.
   *
   * @param {Object} winner - The winner object to filter.
   * @param {string} winner.raffleName - The name of the raffle associated with the winner.
   * @param {string} winner.winnerName - The name of the winner.
   * @param {string} query - The query string to match against the raffleName or winnerName.
   * @returns {boolean} - Returns true if the query is found in either the raffleName or winnerName, otherwise false.
   */
  const filterFn = (winner, query) => {
    const raffleName = winner.raffleName?.toLowerCase() || '';
    const winnerName = winner.winnerName?.toLowerCase() || '';
    const raffleCreated = winner.createdBy?.toLowerCase() || '';
    return (
      raffleName.includes(query) ||
      winnerName.includes(query) ||
      raffleCreated.includes(query)
    );
  };

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredWinners,
  } = useSearch(winners, filterFn);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        await loadWinners();
      } catch {
        errorAlert({ messageKey: 'error_unexpected' });
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  return (
    <WinnersPage
      winners={filteredWinners}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      loading={loading}
    />
  );
};

export default WinnersContainer;
