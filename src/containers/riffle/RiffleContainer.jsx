import { useEffect, useState, useMemo } from 'react';
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
   * Memoized value that filters the `riffle` array to include only active items.
   *
   * @constant
   * @type {Array<Object>}
   * @returns {Array<Object>} An array of objects where each object has `is_active` set to true.
   * @dependency {Array<Object>} riffle - The array of items to filter.
   */
  const activeRiffle = useMemo(() => {
    return riffle.filter((item) => item.is_active);
  }, [riffle]);

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredRiffle,
  } = useSearch(activeRiffle, ['name']);

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
