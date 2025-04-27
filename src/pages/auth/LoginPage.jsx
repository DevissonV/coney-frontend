import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Avatar,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { errorAlert } from '../../services/generic/AlertService.js';
import UserCreateModal from '../../components/users-components/UserCreateModal';
import UserPasswordRecoveryModal from '../../components/users-components/UserPasswordRecoveryModal';
import { useUsers } from '../../hooks/users/useUsers';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importar el ícono de flecha atrás

const LoginPage = ({ onLogin, error, loading }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openRecoveryModal, setOpenRecoveryModal] = useState(false);
  //const [openResendModal, setOpenResendModal] = useState(false);
  const { handleCreateUser } = useUsers();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      errorAlert({ messageKey: 'missing_fields' });
      return;
    }

    onLogin({ email, password });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/dashboard')} // Redirige al dashboard
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10, // Asegura que el botón esté encima de otros elementos
        }}
      >
        {t('back_to_home')}
      </Button>

      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <LockIcon fontSize="large" />
          </Avatar>
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          {t('signin')}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label={t('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? t('loading') : t('signin')}
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          <Button onClick={() => setOpenRecoveryModal(true)}>
            {t('forgot_password')}
          </Button>
        </Typography>

        <Typography align="center" sx={{ mt: 2 }}>
          <Button onClick={() => setOpenCreateModal(true)}>
            {t('create_new_account')}
          </Button>
        </Typography>

        <UserCreateModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          onCreateUser={handleCreateUser}
        />

        <UserPasswordRecoveryModal
          open={openRecoveryModal}
          onClose={() => setOpenRecoveryModal(false)}
        />
      </Paper>
    </Box>
  );
};

export default LoginPage;
