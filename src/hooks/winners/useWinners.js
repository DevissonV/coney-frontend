import { useState } from 'react';
import { fetchWinners } from '../../services/winners/WinnersService';
import { errorAlert } from '../../services/generic/AlertService.js';

export const useWinners = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Asynchronously loads and processes a list of winners with detailed information.
   *
   * This function fetches the winners, retrieves additional details for each winner
   * (such as raffle information, creator details, and ticket details), and updates
   * the state with the processed data. If an error occurs during the process, it logs
   * the error and displays an alert.
   *
   * @async
   * @function
   * @throws Will log an error and trigger an alert if fetching or processing fails.
   */
  const loadWinners = async () => {
    setLoading(true);
    try {
      const data = await fetchWinners();
      const detailedWinners = await Promise.all(
        data.map(async (winner) => {
          const raffle = winner.raffle;
          const creator = winner.raffle.created_by;
          const winnerRaffle = winner.winner;
          const ticket = winner.ticket;

          return {
            ...winner,
            raffleName: raffle.name,
            winnerName: `${winnerRaffle.first_name} ${winnerRaffle.last_name}`,
            winningNumber: ticket.ticket_number,
            createdBy: `${creator.first_name} ${creator.last_name}`,
          };
        }),
      );
      setWinners(detailedWinners);
    } catch {
      errorAlert({ messageKey: 'error_loading_winners' });
    } finally {
      setLoading(false);
    }
  };

  return {
    winners,
    loadWinners,
    loading,
  };
};
