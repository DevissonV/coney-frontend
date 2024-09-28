import { useState } from 'react';
import { fetchCountries, createCountry, editCountry, deleteCountry } from '../../services/countries/CountryService';
import { errorAlert, toast, confirmDelete } from '../../services/generic/AlertService';

export const useCountries = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

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

  const handleDeleteCountry = async (id) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title', 
      messageKey: 'confirm_delete_message'
    });
  
    if (result.isConfirmed) { 
      try {
        await deleteCountry(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        loadCountries();
      } catch (error) {
        errorAlert({ messageKey: 'error_deleting_country' });
      }
    } 
  };

  return {
    countries,
    loading,
    loadCountries,
    handleCreateCountry,
    handleEditCountry,
    handleDeleteCountry,
  };
};
