import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  CircularProgress,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import useAuthStore from '../../stores/auth/useAuthStore';
import { fetchUsers } from '../../services/users/UserService';
import { fetchRaffle } from '../../services/riffle/RiffleService';
import { errorAlert } from '../../services/generic/AlertService';
import { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/users/useUsers';
import UserEditModal from '../../components/users-components/UserEditModal';

const WidgetCard = ({ icon, label, value, color }) => {
  const theme = useTheme();
  return (
    <Card elevation={6} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: color, mr: 2 }}>{icon}</Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {label}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="textPrimary">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const WelcomeSection = ({ name, isAuthenticated }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      textAlign="center"
      py={{ xs: 4, md: 6 }}
      px={{ xs: 2, md: 4 }}
      borderRadius={3}
      boxShadow={6}
      maxWidth="1000px"
      margin="0 auto 40px"
      bgcolor="background.paper"
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <EmojiEventsIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 1 }} />
      <Typography
        variant="h4"
        fontWeight={800}
        gutterBottom
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {isAuthenticated
          ? `${t('welcome_back')}, ${name}`
          : t('welcome_to_coney')}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        {isAuthenticated ? t('welcome_to_tool') : t('intro_to_coney')}
      </Typography>
      {!isAuthenticated && (
        <>
          <Typography variant="body2" color="error" gutterBottom>
            {t('signup_invitation')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/login"
            sx={{ px: 4, py: 1.5, fontWeight: 'bold', borderRadius: 2, boxShadow: 2 }}
          >
            {t('login')}
          </Button>
        </>
      )}
    </Box>
  );
};

const DashboardContainer = () => {
  const { t } = useTranslation();
  const { user: loggedUser, updateUser } = useAuthStore();
  const { handleUpdateUser } = useUsers();

  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeRaffles, setActiveRaffles] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);

  const isAuthenticated = !!loggedUser;
  const fullName = `${loggedUser?.first_name || ''} ${loggedUser?.last_name || ''}`.trim();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const raffles = await fetchRaffle();
        setActiveRaffles(raffles.length);

        if (isAuthenticated) {
          const users = await fetchUsers();
          setTotalUsers(users.length);
        }
      } catch (error) {
        errorAlert({ messageKey: error.response?.data?.message || 'error_loading_data' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (loggedUser && !loggedUser.photo_url) {
      setOpenEditModal(true);
    }
  }, [loggedUser]);

  return (
    <DashboardPage>
      <WelcomeSection name={fullName} isAuthenticated={isAuthenticated} />

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Box px={{ xs: 2, md: 3 }}>
          <Grid container spacing={4} justifyContent="center">
            {isAuthenticated && (
              <Grid item xs={12} sm={6} md={4}>
                <WidgetCard
                  icon={<PeopleIcon />}
                  label={t('total_users')}
                  value={totalUsers}
                  color="info.main"
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <WidgetCard
                icon={<ConfirmationNumberIcon />}
                label={t('total_raffles')}
                value={activeRaffles}
                color="primary.main"
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {loggedUser && (
        <UserEditModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          currentUser={loggedUser}
          onEditUser={handleUpdateUser}
        />
      )}
    </DashboardPage>
  );
};

export default DashboardContainer;
