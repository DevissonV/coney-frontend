import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import UserActions from './UserActions';
import CellContent from '../generic/table/CellContent';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';

const UsersTable = ({ rows, loading, onEdit, onDelete, onApprove }) => {
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
        field: 'firstName',
        headerName: t('first_name'),
        flex: 1.5,
        minWidth: 120,
        renderCell: (params) => <CellContent value={params.value} />,
      },
      {
        field: 'lastName',
        headerName: t('last_name'),
        flex: 1.5,
        minWidth: 120,
        renderCell: (params) => <CellContent value={params.value} />,
      },
      {
        field: 'email',
        headerName: t('email'),
        flex: 1.5,
        minWidth: 200,
        renderCell: (params) => <CellContent value={params.value} />,
      },
      {
        field: 'createdAt',
        headerName: t('created_at'),
        flex: 1.2,
        minWidth: 150,
        renderCell: (params) => {
          const formattedDate = params.value
            ? new Date(params.value).toLocaleDateString()
            : t('no_data');
          return <CellContent value={formattedDate} />;
        },
      },
    ];

    if (user?.role === ROLE_ADMIN) {
      baseColumns.push({
        field: 'actions',
        headerName: t('actions'),
        renderCell: (params) => (
          <UserActions 
            userId={params.row.id} 
            email={params.row.email} 
            isEmailValidated={params.row.isEmailValidated}
            isUserAuthorized={params.row.isUserAuthorized}
            onEdit={onEdit} 
            onDelete={onDelete} 
            onApprove={onApprove} 
          />
        ),
        flex: 0.5,
        minWidth: 150,
        sortable: false,
        filterable: false,
      });
    }

    return baseColumns;
  }, [t, onEdit, onDelete, onApprove, user?.role]);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        autoHeight
        getRowHeight={() => 45}
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
            minHeight: 45,
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

UsersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default UsersTable;
