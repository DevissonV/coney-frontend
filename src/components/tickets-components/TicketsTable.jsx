import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TicketActions from './TicketActions';

const TicketsTable = ({ rows, pageSize, loading, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const localeText = {
    columnMenuSortAsc: t('sort_asc'),
    columnMenuSortDesc: t('sort_desc'),
    columnMenuFilter: t('filter'),
    columnMenuHideColumn: t('hide_column'),
    columnMenuManageColumns: t('manage_columns'),
    noRowsLabel: t('no_rows'),
    MuiTablePagination: {
      labelRowsPerPage: t('rows_per_page'),
    },
  };

  const columns = [
    { field: 'ticket_number', headerName: t('ticket_number'), flex: 1 },
    {
      field: 'actions',
      headerName: t('actions'),
      renderCell: (params) => (
        <TicketActions
          ticketId={params.row.id}
          onEdit={() => onEdit(params.row)}
          onDelete={() => onDelete(params.row.id)}
        />
      ),
      flex: 1,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        pageSizeOptions={[20, 40, 60, 100]}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
        localeText={localeText}
      />
    </Box>
  );
};

TicketsTable.prototype = {
  rows: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketsTable;
