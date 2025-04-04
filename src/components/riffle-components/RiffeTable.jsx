import { Box, Tooltip } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import RiffleActions from './RiffleActions';
import CellContent from '../generic/table/CellContent';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ANONYMOUS } from '../../utils/generic/constants';
import { format } from 'date-fns';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

const RiffleTable = ({
  rows,
  loading,
  onEdit,
  onDelete,
  onViewTickets,
  handleWinner,
}) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const localeText = useMemo(
    () => ({
      columnMenuSortAsc: t('sort_asc'),
      columnMenuSortDesc: t('sort_desc'),
      columnMenuFilter: t('filter'),
      columnMenuHideColumn: t('hide_column'),
      columnMenuManageColumns: t('manage_columns'),
      noRowsLabel: t('no_rows'),
      MuiTablePagination: {
        labelRowsPerPage: t('rows_per_page'),
      },
    }),
    [t],
  );

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
        field: 'end_date',
        headerName: t('end_date'),
        flex: 1.5,
        minWidth: 180,
        renderCell: (params) => {
          const formattedDate = format(
            new Date(params.value),
            'yyyy-MM-dd hh:mm',
          );
          return <CellContent value={formattedDate} />;
        },
      },
      {
        field: 'available_tickets',
        headerName: t('available_tickets'),
        flex: 1.5,
        minWidth: 180,
        renderCell: (params) => <CellContent value={params.value} />,
      },
      {
        field: 'price',
        headerName: t('price'),
        flex: 1.5,
        minWidth: 180,
        renderCell: (params) => {
          const formattedPrice = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
          }).format(params.value);

          return <CellContent value={formattedPrice} />;
        },
      },
    ];

    if (user && user.role !== ROLE_ANONYMOUS) {
      baseColumns.push({
        field: 'Ganador',
        headerName: t('winner'),
        flex: 1.5,
        minWidth: 100,
        renderCell: (params) => {
          const isCreatedByUser = params.row.created_by === user?.id;

          return isCreatedByUser ? (
            <Tooltip title={t('select_winner')} arrow>
              <EmojiEventsOutlinedIcon
                onClick={() => handleWinner(params.row)}
                sx={{
                  cursor: 'pointer',
                  color: 'goldenrod',
                  fontSize: 30,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title={t('not_your_riffle')} arrow>
              <InfoOutlinedIcon color="disabled" />
            </Tooltip>
          );
        },
      });
    }

    baseColumns.push({
      field: 'actions',
      headerName: t('actions'),
      renderCell: (params) => (
        <RiffleActions
          riffleId={params.row.id}
          availableTickets={params.row.available_tickets}
          createdBy={params.row.created_by}
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

    return baseColumns;
  }, [t, onEdit, onDelete, onViewTickets, handleWinner, user]);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={false}
        getRowHeight={() => 60}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        loading={loading}
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        localeText={localeText}
        sx={{
          maxHeight: 600,
          overflow: 'auto',
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
  handleWinner: PropTypes.func.isRequired,
};

export default RiffleTable;
