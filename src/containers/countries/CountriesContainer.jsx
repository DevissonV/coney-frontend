import { useEffect, useState } from 'react';
import CountriesPage from '../../pages/countries/CountriesPage';
import { useCountries } from '../../hooks/countries/useCountries';
import { useSearch } from '../../hooks/generic/useSearch';

const CountriesContainer = () => {
  const {
    countries,
    loading,
    loadCountries,
    handleCreateCountry,
    handleDeleteCountry,
    handleEditCountry,
  } = useCountries();

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredCountries,
  } = useSearch(countries, ['name']);

  const [openModal, setOpenModal] = useState(false);
  const [countryToEdit, setCountryToEdit] = useState(null);

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <CountriesPage
      countries={filteredCountries}
      loading={loading}
      onCreate={handleCreateCountry}
      onEdit={(country) => {
        setCountryToEdit(country);
        setOpenModal(true);
      }}
      onDelete={handleDeleteCountry}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      openModal={openModal}
      setOpenModal={setOpenModal}
      countryToEdit={countryToEdit}
      setCountryToEdit={setCountryToEdit}
      onSubmit={(countryData) => {
        if (countryToEdit) {
          handleEditCountry(countryToEdit.id, countryData);
        } else {
          handleCreateCountry(countryData);
        }
        setOpenModal(false);
      }}
    />
  );
};

export default CountriesContainer;
