import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import RiffleTable from '../../components/riffle-components/RiffeTable';
import RiffleFormModal from '../../components/riffle-components/RiffleFormModal';
import { useTranslation } from 'react-i18next';

const RifflePage = ({
  riffle,
  loading,
  onCreate,
  onEdit,
  onDelete,
  searchQuery,
  onSearchChange,
  openModal,
  setOpenModal,
  riffleToEdit,
  setRiffleToEdit,
  onSubmit
}) => {
  const { t } = useTranslation();
  
  
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('riffle')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setRiffleToEdit(null);
            setOpenModal(true);
          }}
          style={{ position: 'absolute', right: 0 }}
        >
          {t('create_riffle')}
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder={t('search_placeholder_riffle')}
        />
      </Box>

      <RiffleTable
        rows={riffle}
        pageSize={pageSize}
        setPageSize={setPageSize} 
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <RiffleFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setRiffleToEdit(null);
        }}
        onSubmit={onSubmit} 
        initialValues={riffleToEdit || { name: '' }}
      />
    </Box>
  );
};

export default RifflePage;
