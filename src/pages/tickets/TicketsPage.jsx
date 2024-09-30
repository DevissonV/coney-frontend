import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import TicketsTable from '../../components/tickets-components/TicketsTable';
import TicketFormModal from '../../components/tickets-components/TicketFormModal';
import { useTranslation } from 'react-i18next';

const TicketsPage = ({
  tickets,
  loading,
  onCreate,
  onEdit,
  onDelete,
  searchQuery,
  onSearchChange,
  openModal,
  setOpenModal,
  ticketToEdit,
  setTicketToEdit,
  onSubmit
}) => {
  const { t } = useTranslation();
  
  
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h4" gutterBottom textAlign="center" style={{ flexGrow: 1 }}>
          {t('tickets')}
        </Typography>
        {/* <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setTicketToEdit(null);
            setOpenModal(true);
          }}
          style={{ position: 'absolute', right: 0 }}
        >
          {t('create_ticket')}
        </Button> */}
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder={t('search_placeholder_ticket')}
        />
      </Box>

      <TicketsTable
        rows={tickets}
        pageSize={pageSize}
        setPageSize={setPageSize} 
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TicketFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setTicketToEdit(null);
        }}
        onSubmit={onSubmit} 
        initialValues={ticketToEdit || { name: '' }}
      />
    </Box>
  );
};

export default TicketsPage;
