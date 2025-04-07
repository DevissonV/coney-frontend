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

  /**
   * Filters a list of countries based on a query string.
   *
   * @param {Object} countries - The country object to filter.
   * @param {string} countries.name - The name of the country.
   * @param {string} query - The query string to match against the country name.
   * @returns {boolean} - Returns `true` if the country's name includes the query string, otherwise `false`.
   */
  const filterFn = (countries, query) => {
    const countrieName = countries.name?.toLowerCase() || '';
    return countrieName.includes(query);
  };

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredCountries,
  } = useSearch(countries, filterFn);

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
