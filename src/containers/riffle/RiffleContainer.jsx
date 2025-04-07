import { useEffect, useState } from 'react';
import RifflePage from '../../pages/riffle/RifflePage';
import { useRiffle } from '../../hooks/riffle/useRiffle';
import { useSearch } from '../../hooks/generic/useSearch';

const RiffleContainer = () => {
  const {
    riffle,
    loadRaffle,
    handleCreateRaffle,
    handleDeleteRiffle,
    handleEditRiffle,
    handleWinner,
  } = useRiffle();

  /**
   * Filters a riffle object based on a query string.
   *
   * @param {Object} riffle - The riffle object to be filtered.
   * @param {string} riffle.name - The name of the raffle.
   * @param {string} riffle.price - The name of the winner.
   * @param {string} query - The query string to filter by.
   * @returns {boolean} - Returns true if the raffle name or winner name includes the query string (case-insensitive), otherwise false.
   */
  const filterFn = (riffle, query) => {
    const raffleName = riffle.name?.toLowerCase() || '';
    const rafflePrice = riffle.price?.toLowerCase() || '';
    return raffleName.includes(query) || rafflePrice.includes(query);
  };

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredRiffle,
  } = useSearch(riffle, filterFn);

  const [openModal, setOpenModal] = useState(false);
  const [riffleToEdit, setRiffleToEdit] = useState(null);

  useEffect(() => {
    loadRaffle();
  }, []);
  return (
    <RifflePage
      riffle={filteredRiffle}
      onCreate={handleCreateRaffle}
      onEdit={(riffle) => {
        setRiffleToEdit(riffle);
        setOpenModal(true);
      }}
      onDelete={handleDeleteRiffle}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      openModal={openModal}
      setOpenModal={setOpenModal}
      riffleToEdit={riffleToEdit}
      setRiffleToEdit={setRiffleToEdit}
      onSubmit={(raffleData) => {
        if (riffleToEdit) {
          handleEditRiffle(riffleToEdit.id, raffleData);
        } else {
          handleCreateRaffle(raffleData);
        }
        setOpenModal(false);
      }}
      handleWinner={handleWinner}
    />
  );
};

export default RiffleContainer;
