import {
  Box,
  Button,
  Typography,
  CircularProgress,
  ButtonGroup,
} from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import RiffleFormModal from '../../components/riffle-components/RiffleFormModal';
import { useTranslation } from 'react-i18next';
//import { useTheme } from '@mui/material/styles';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_USER } from '../../utils/generic/constants';
import RiffleCardList from '../../components/riffle-components/RiffleCardList';
import { useState } from 'react';

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
  const [showMyRaffles, setShowMyRaffles] = useState(false);

  const handleViewTickets = (riffleId) => {
    navigate(`/tickets/${riffleId}`);
  };

  const canCreateRaffle = user?.role === ROLE_ADMIN || user?.role === ROLE_USER;

  const filteredRaffles = showMyRaffles
    ? riffle.filter((raffle) => {
        return String(raffle.created_by) === String(user?.id);
      })
    : riffle;

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
            flexDirection="column"
            alignItems="center"
            gap={3}
            mb={4}
          >
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={2}
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <SearchToolbar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                placeholder={t('search_placeholder_riffle')}
                sx={{
                  width: { xs: '100%', sm: '400px' },
                }}
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
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: '200px',
                  }}
                >
                  {t('create_riffle')}
                </Button>
              )}
            </Box>

            {canCreateRaffle && (
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                sx={{ mt: 2 }}
              >
                <ButtonGroup
                  variant="contained"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  <Button
                    color={!showMyRaffles ? 'primary' : 'inherit'}
                    onClick={() => setShowMyRaffles(false)}
                    sx={{
                      flex: { xs: 1, sm: 'none' },
                      px: 4,
                    }}
                  >
                    {t('all_raffles')}
                  </Button>
                  <Button
                    color={showMyRaffles ? 'primary' : 'inherit'}
                    onClick={() => setShowMyRaffles(true)}
                    sx={{
                      flex: { xs: 1, sm: 'none' },
                      px: 4,
                    }}
                  >
                    {t('my_raffles')}
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          </Box>

          <RiffleCardList
            rows={filteredRaffles}
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
