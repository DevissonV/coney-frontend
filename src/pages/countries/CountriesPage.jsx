import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import CountriesTable from '../../components/countries-components/CountriesTable';
import CountryFormModal from '../../components/countries-components/CountryFormModal';
import { useTranslation } from 'react-i18next';

const CountriesPage = ({
  countries,
  loading,
  onCreate,
  onEdit,
  onDelete,
  searchQuery,
  onSearchChange,
  openModal,
  setOpenModal,
  countryToEdit,
  setCountryToEdit,
  onSubmit
}) => {
  const { t } = useTranslation();
  
  
  const [pageSize, setPageSize] = useState(5);

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
          onSearchChange={onSearchChange}
          placeholder={t('search_placeholder_country')}
        />
      </Box>

      <CountriesTable
        rows={countries}
        pageSize={pageSize}
        setPageSize={setPageSize} 
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <CountryFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCountryToEdit(null);
        }}
        onSubmit={onSubmit} 
        initialValues={countryToEdit || { name: '' }}
      />
    </Box>
  );
};

export default CountriesPage;
