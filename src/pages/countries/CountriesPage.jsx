import { useState } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CountriesTable from '../../components/countries-components/CountriesTable';
import CountryFormModal from '../../components/countries-components/CountryFormModal';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import { useTheme } from '@mui/material/styles';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';

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
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuthStore();

  return (
    <Box>
      <Box
        display="flex"
        justifyContent={isMobile ? 'center' : 'space-between'}
        alignItems="center"
        mb={2}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          style={{ flexGrow: 1 }}
        >
          {t('countries')}
        </Typography>

        {user?.role === ROLE_ADMIN && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCountryToEdit(null);
              setOpenModal(true);
            }}
            style={{ marginTop: isMobile ? '16px' : '0' }}
          >
            {t('create_country')}
          </Button>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent={isMobile ? 'center' : 'flex-start'}
        mb={2}
      >
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
