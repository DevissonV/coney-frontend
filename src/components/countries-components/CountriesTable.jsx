import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CountryActions from './CountryActions';
import useAuthStore from '../../stores/auth/useAuthStore';

const CountriesTable = ({ rows, pageSize, setPageSize, loading, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore(); 

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
    { field: 'id', headerName: t('id'), flex: 1 },
    { field: 'name', headerName: t('name'), flex: 1 },
  ];
  if (user?.role === 'admin') {
    columns.push({
      field: 'actions',
      headerName: t('actions'),
      renderCell: (params) => (
        <CountryActions
          countryId={params.row.id}
          onEdit={() => onEdit(params.row)}
          onDelete={onDelete}
        />
      ),
      flex: 1,
      sortable: false,
      filterable: false,
    });
  }

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSizeOptions={[5, 10, 20, 50]}
        localeText={localeText}
        loading={loading}
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
      />
    </Box>
  );
};

CountriesTable.propTypes = {
  rows: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CountriesTable;
