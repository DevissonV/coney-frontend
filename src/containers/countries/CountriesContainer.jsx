import { useState, useEffect } from 'react';
import CountriesTable from '../../components/countries-components/CountriesTable';
import { fetchCountries, deleteCountry, createCountry, editCountry } from '../../services/countries/CountryService';
import { errorAlert, toast, confirmDelete } from '../../services/generic/AlertService';
import CountryFormModal from '../../components/countries-components/CountryFormModal';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CountriesContainer = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [countryToEdit, setCountryToEdit] = useState(null);


  const loadCountries = async () => {
    setLoading(true);
    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (error) {
      errorAlert({ messageKey: 'error_loading_countries' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleDeleteCountry = async (id) => {
    if (await confirmDelete({ titleKey: 'confirm_delete_title', messageKey: 'confirm_delete_message' })) {
      try {
        await deleteCountry(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        loadCountries();
      } catch (error) {
        errorAlert({ messageKey: 'error_deleting_country' });
      }
    }
  };

  const handleCreateCountry = async (countryData) => {
    try {
      await createCountry(countryData);
      toast({ icon: 'success', titleKey: 'create_success' });
      loadCountries();
    } catch (error) {
      errorAlert({ messageKey: 'error_creating_country' });
    }
  };

  const handleEditCountry = async (id, countryData) => {
    try {
      await editCountry(id, countryData);
      toast({ icon: 'success', titleKey: 'edit_success' });
      loadCountries();
    } catch (error) {
      errorAlert({ messageKey: 'error_updating_country' });
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('countries')}
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setCountryToEdit(null);  
            setOpenModal(true);     
          }}
          style={{ position: 'absolute', right: 0 }}
        >
          {t('create_country')}
        </Button>

      </Box>
        
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          placeholder={t('search_placeholder_country')}
        />
      </Box>
  

      <CountriesTable 
        rows={filteredCountries}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={loading}
        onEdit={(country) => {
          setCountryToEdit(country);
          setOpenModal(true);
        }}
        onDelete={handleDeleteCountry}
      />

      <CountryFormModal
        open={openModal}Dialog 
        onClose={() => {
          setOpenModal(false);
          setCountryToEdit(null); 
        }}
        onSubmit={(countryData) => {
          if (countryToEdit) {
            handleEditCountry(countryToEdit.id, countryData);  
          } else {
            handleCreateCountry(countryData);
          }
        }}
        initialValues={countryToEdit || { name: '' }}
      />
    </Box>
  );
};

export default CountriesContainer;
