import { Box, Button, Typography, CircularProgress } from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import RiffleFormModal from '../../components/riffle-components/RiffleFormModal';
import { useTranslation } from 'react-i18next';
//import { useTheme } from '@mui/material/styles';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_USER } from '../../utils/generic/constants';
import RiffleCardList from '../../components/riffle-components/RiffleCardList';

const RifflePage = ({
  riffle,
  onEdit,
  onDelete,
  searchQuery,
  onSearchChange,
  openModal,
  setOpenModal,
  riffleToEdit,
  setRiffleToEdit,
  onSubmit,
  handleWinner,
  loading,
}) => {
  const { t } = useTranslation();
  //const [pageSize, setPageSize] = useState(5);

  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleViewTickets = (riffleId) => {
    navigate(`/tickets/${riffleId}`);
  };

  const canCreateRaffle = user?.role === ROLE_ADMIN || user?.role === ROLE_USER;

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {t('riffle')}
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="center"
            alignItems={{ xs: 'stretch', md: 'center' }}
            gap={2}
            mb={4}
          >
            <SearchToolbar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              placeholder={t('search_placeholder_riffle')}
            />

            {canCreateRaffle && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setRiffleToEdit(null);
                  setOpenModal(true);
                }}
                sx={{
                  whiteSpace: 'nowrap',
                  height: '40px',
                  alignSelf: { xs: 'stretch', md: 'auto' },
                }}
              >
                {t('create_riffle')}
              </Button>
            )}
          </Box>

          <RiffleCardList
            rows={riffle}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewTickets={handleViewTickets}
            handleWinner={handleWinner}
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
        </>
      )}
    </Box>
  );
};

export default RifflePage;
