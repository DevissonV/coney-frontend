import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import TicketsTable from '../../components/tickets-components/TicketsTable';
import { useTranslation } from 'react-i18next';

const TicketsPage = ({ 
  tickets, 
  loading, 
  onEdit, 
  onDelete, 
  searchQuery, 
  onSearchChange 
}) => {
  const { t } = useTranslation();
  const [ pageSize ] = useState(20);

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h4" gutterBottom textAlign="center" flexGrow={1}>
          {t('tickets')}
        </Typography>
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
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Box>
  );
};

export default TicketsPage;
