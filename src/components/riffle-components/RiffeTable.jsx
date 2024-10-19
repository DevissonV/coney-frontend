import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import RiffleActions from './RiffleActions';
import CellContent from '../generic/table/CellContent';
import useAuthStore from '../../stores/auth/useAuthStore';

const RiffleTable = ({ rows, loading, onEdit, onDelete, onViewTickets }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

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

  const columns = useMemo(() => {
    const baseColumns = [
      {
        field: 'name',
        headerName: t('name'),
        flex: 1.5,
        minWidth: 180,
        renderCell: (params) => <CellContent value={params.value} />,
      },
      {
        field: 'description',
        headerName: t('description'),
        flex: 1.5,
        minWidth: 180,
        renderCell: (params) => <CellContent value={params.value} />,
      },
      {
        field: 'initDate',
        headerName: t('initDate'),
        flex: 1.2,
        minWidth: 180,
        renderCell: (params) => {
          const formattedDate = new Date(params.value).toLocaleDateString();
          return <CellContent value={formattedDate} />;
        },
      },
      {
        field: 'endtDate',
        headerName: t('endDate'),
        flex: 1.2,
        minWidth: 180,
        renderCell: (params) => {
          const formattedDate = params.value
            ? new Date(params.value).toLocaleDateString()
            : t('no_data');
          return <CellContent value={formattedDate} />;
        },
      },
    ];

    if (user) {
      baseColumns.push({
        field: 'actions',
        headerName: t('actions'),
        renderCell: (params) => (
          <RiffleActions
            riffleId={params.row.id}
            onEdit={() => onEdit(params.row)}
            onDelete={onDelete}
            onViewTickets={onViewTickets}
          />
        ),
        flex: 0.5,
        minWidth: 150,
        sortable: false,
        filterable: false,
      });
    }

    return baseColumns;
  }, [t, onEdit, onDelete, user]);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        autoHeight
        getRowHeight={() => 60}
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
          maxHeight: 600,
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.5',
            minHeight: 60,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            overflow: 'visible',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
          '& .MuiDataGrid-root': {
            border: 'none',
          },
        }}
      />
    </Box>
  );
};

RiffleTable.propTypes = {
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewTickets: PropTypes.func.isRequired,
};

export default RiffleTable;
