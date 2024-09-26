import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CountriesTable from '../../components/countries-components/CountriesTable';
import { useTranslation } from 'react-i18next';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';

const CountriesPage = ({ countries, loading, onDelete, onEdit }) => {
  const { t } = useTranslation();
  const [filteredRows, setFilteredRows] = useState(countries);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredRows(countries); 
  }, [countries]);
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredRows(countries); 
    } else {
      const filtered = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(query.toLowerCase()) 
      );
      setFilteredRows(filtered);
    }
  };

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('countries')}
        </Typography>
        <Button variant="contained" color="primary" style={{ position: 'absolute', right: 0 }}>
          {t('create_country')}
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <SearchToolbar
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange}
          placeholder={t('search_placeholder_country')}
        />
      </Box>

      <CountriesTable
        rows={filteredRows}
        pageSize={5}
        setPageSize={() => {}}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Box>
  );
};

export default CountriesPage;
