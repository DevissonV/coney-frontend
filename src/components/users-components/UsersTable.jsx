import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import UserActions from './UserActions'; // Importamos el componente de acciones
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const UsersTable = ({ rows, pageSize, setPageSize, loading, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const columns = [
    { field: 'firstName', headerName: t('first_name'), flex: 1 },
    { field: 'lastName', headerName: t('last_name'), flex: 1 },
    { field: 'email', headerName: t('email'), flex: 1 },
    { field: 'createdAt', headerName: t('created_at'), flex: 1 },
    {
      field: 'actions',
      headerName: t('actions'), 
      renderCell: (params) => (
        <UserActions
          userId={params.row.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
      flex: 1,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
};

UsersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsersTable;
