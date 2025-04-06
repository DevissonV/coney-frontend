import { useEffect } from 'react';
import WinnersPage from '../../pages/winners/WinnersPage';
import { useWinners } from '../../hooks/winners/useWinners';
import { useSearch } from '../../hooks/generic/useSearch';

const WinnersContainer = () => {
  const { winners, loadWinners } = useWinners();
  const { filteredData: filteredWinners } = useSearch(winners, ['name']);

  useEffect(() => {
    loadWinners();
  }, []);

  return <WinnersPage winners={filteredWinners} />;
};

export default WinnersContainer;
