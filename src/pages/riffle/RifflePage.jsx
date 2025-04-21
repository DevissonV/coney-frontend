import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import RiffleFormModal from '../../components/riffle-components/RiffleFormModal';
import { useTranslation } from 'react-i18next';
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
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [filterView, setFilterView] = useState('all'); // 'all' | 'mine' | 'pending'

  const handleViewTickets = (riffleId) => {
    navigate(`/tickets/${riffleId}`);
  };

  const canCreateRaffle = user?.role === ROLE_ADMIN || user?.role === ROLE_USER;

  const hasMyRaffles = riffle.some(r => String(r.created_by) === String(user?.id));
  const hasPendingRaffles =
    user?.role === ROLE_ADMIN
      ? riffle.some(r => r.authorization_status !== 'approved')
      : riffle.some(r => r.authorization_status !== 'approved' && String(r.created_by) === String(user?.id));

  const filteredRaffles = riffle.filter((raffle) => {
    const isOwner = String(raffle.created_by) === String(user?.id);
    const isAdmin = user?.role === ROLE_ADMIN;
    const isAuthorized = raffle.authorization_status === 'approved';

    if (filterView === 'mine') return isOwner;
    if (filterView === 'pending') {
      return user?.role === ROLE_ADMIN
        ? raffle.authorization_status !== 'approved'
        : isOwner && !isAuthorized;
    }

    return isOwner || isAdmin || isAuthorized;
  });

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {t('riffle')}
          </Typography>

          <Box display="flex" flexDirection="column" alignItems="center" gap={3} mb={4}>
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
                sx={{ width: { xs: '100%', sm: '400px' } }}
              />

              {canCreateRaffle && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setRiffleToEdit(null);
                    setOpenModal(true);
                  }}
                  sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: '200px' }}
                >
                  {t('create_riffle')}
                </Button>
              )}
            </Box>

            {canCreateRaffle && (
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={1}
                width={{ xs: '100%', sm: 'auto' }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color={filterView === 'all' ? 'primary' : 'inherit'}
                  onClick={() => setFilterView('all')}
                >
                  {t('all_raffles')}
                </Button>

                {hasMyRaffles && (
                  <Button
                    fullWidth
                    variant="contained"
                    color={filterView === 'mine' ? 'primary' : 'inherit'}
                    onClick={() => setFilterView('mine')}
                  >
                    {t('my_raffles')}
                  </Button>
                )}

                {hasPendingRaffles && (
                  <Button
                    fullWidth
                    variant="contained"
                    color={filterView === 'pending' ? 'primary' : 'inherit'}
                    onClick={() => setFilterView('pending')}
                  >
                    {t('pending_authorization')}
                  </Button>
                )}
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
