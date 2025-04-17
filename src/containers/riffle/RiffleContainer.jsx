import { useEffect, useState } from 'react';
import RifflePage from '../../pages/riffle/RifflePage';
import { useRiffle } from '../../hooks/riffle/useRiffle';
import { useSearch } from '../../hooks/generic/useSearch';
import { errorAlert } from '../../services/generic/AlertService.js';

const RiffleContainer = () => {
  const {
    riffle,
    loadRaffle,
    handleCreateRaffle,
    handleDeleteRiffle,
    handleEditRiffle,
    handleWinner,
  } = useRiffle();
  const [loading, setLoading] = useState(true);
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
    const fetchRaffle = async () => {
      try {
        setLoading(true);
        await loadRaffle();
      } catch {
        errorAlert({ messageKey: 'error_unexpected' });
      } finally {
        setLoading(false);
      }
    };

    fetchRaffle();
  }, []);
  return (
    <RifflePage
      riffle={filteredRiffle}
      onCreate={handleCreateRaffle}
      loading={loading}
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
      onSubmit={(raffleData, photo) => {
        if (riffleToEdit) {
          handleEditRiffle(riffleToEdit.id, raffleData, photo);
        } else {
          handleCreateRaffle(raffleData, photo);
        }
        setOpenModal(false);
      }}
      handleWinner={handleWinner}
    />
  );
};

export default RiffleContainer;
