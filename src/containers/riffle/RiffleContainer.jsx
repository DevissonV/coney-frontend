import { useEffect, useState } from 'react';
import RifflePage from '../../pages/riffle/RifflePage';
import { useRiffle } from '../../hooks/riffle/useRiffle';
import { useSearch } from '../../hooks/generic/useSearch';

const RiffleContainer = () => {
  const {
    riffle,
    loading,
    loadRaffle,
    handleCreateRiffle,
    handleDeleteRiffle,
    handleEditRiffle,
  } = useRiffle();
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredRiffle,
  } = useSearch(riffle, ['name']);

  const [openModal, setOpenModal] = useState(false);
  const [riffleToEdit, setRiffleToEdit] = useState(null);

  useEffect(() => {
    loadRaffle();
  }, []);
  return (
    <RifflePage
      riffle={filteredRiffle}
      loading={loading}
      onCreate={handleCreateRiffle}
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
      onSubmit={(riffleData) => {
        if (riffleToEdit) {
          handleEditRiffle(riffleToEdit.id, riffleData);
        } else {
          handleCreateRiffle(riffleData);
        }
        setOpenModal(false);
      }}
    />
  );
};

export default RiffleContainer;
