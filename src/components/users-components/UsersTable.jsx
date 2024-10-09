import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import UserActions from './UserActions';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const UsersTable = ({ rows, loading, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const localeText = useMemo(() => ({
    columnMenuSortAsc: t('sort_asc'),
    columnMenuSortDesc: t('sort_desc'),
    columnMenuFilter: t('filter'),
    columnMenuHideColumn: t('hide_column'),
    columnMenuManageColumns: t('manage_columns'),
    noRowsLabel: t('no_rows'),
    MuiTablePagination: {
      labelRowsPerPage: t('rows_per_page'),
    },
  }), [t]);

  
  const columns = useMemo(() => [
    {
      field: 'firstName',
      headerName: t('first_name'),
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <CellContent value={params.value} />,
    },
    {
      field: 'lastName',
      headerName: t('last_name'),
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <CellContent value={params.value} />,
    },
    {
      field: 'email',
      headerName: t('email'),
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <CellContent value={params.value} />,
    },
    {
      field: 'createdAt',
      headerName: t('created_at'),
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <CellContent value={params.value} />,
    },
    {
      field: 'actions',
      headerName: t('actions'),
      renderCell: (params) => (
        <UserActions userId={params.row.id} onEdit={onEdit} onDelete={onDelete} />
      ),
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      filterable: false,
    },
  ], [t, onEdit, onDelete]);

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        autoHeight
        getRowHeight={() => 'auto'}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        loading={loading}
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        localeText={localeText}
        sx={{
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.5',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            overflow: 'visible',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
        }}
      />
    </Box>
  );
};

const CellContent = ({ value }) => (
  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    {value}
  </div>
);

UsersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CellContent.propTypes = {
  value: PropTypes.string.isRequired,
};

export default UsersTable;
