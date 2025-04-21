import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import RiffleFormModal from '../../components/riffle-components/RiffleFormModal';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {
  ROLE_ADMIN,
  ROLE_USER,
  AUTHORIZATION_STATUS_APPROVED,
} from '../../utils/generic/constants';
import RiffleCardList from '../../components/riffle-components/RiffleCardList';
import { useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

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
      ? riffle.some(r => r.authorization_status !== AUTHORIZATION_STATUS_APPROVED)
      : riffle.some(r => r.authorization_status !== AUTHORIZATION_STATUS_APPROVED && String(r.created_by) === String(user?.id));

  const filteredRaffles = riffle.filter((raffle) => {
    const isOwner = String(raffle.created_by) === String(user?.id);
    const isAdmin = user?.role === ROLE_ADMIN;
    const isAuthorized = raffle.authorization_status === AUTHORIZATION_STATUS_APPROVED;

    if (filterView === 'mine') return isOwner;
    if (filterView === 'pending') {
      return user?.role === ROLE_ADMIN
        ? raffle.authorization_status !== AUTHORIZATION_STATUS_APPROVED
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

            {filterView === 'pending' && (
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2f2f2f' : '#fff8e1',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#fbc02d' : '#ffecb3',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#fffde7' : '#795548',
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 4,
                  maxWidth: '900px',
                  mx: 'auto',
                }}
              >
                <ReportProblemIcon
                  fontSize="large"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#ffb300' : '#f57c00',
                    mt: '2px',
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {t('authorization_info_title')}
                  </Typography>
                  <Typography variant="body2">
                    {t('authorization_info_message')}
                  </Typography>
                </Box>
              </Paper>
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
