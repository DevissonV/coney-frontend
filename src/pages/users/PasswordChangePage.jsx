import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useUsers } from '../../hooks/users/useUsers';
import { errorAlert, toast } from '../../services/generic/AlertService';
import LockResetIcon from '@mui/icons-material/LockReset';

const PasswordChangePage = () => {
  const { t } = useTranslation();
  const { handleChangePassword } = useUsers();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const token = searchParams.get('token');

  const handleSubmit = async () => {
    if (!token) {
      errorAlert({ messageKey: 'invalid_token' });
      return;
    }

    if (newPassword !== confirmPassword) {
      errorAlert({ messageKey: 'passwords_do_not_match' });
      return;
    }

    try {
      await handleChangePassword(token, newPassword);
      toast({ messageKey: 'password_change_success' });
      navigate('/login');
    } catch {
      errorAlert({ messageKey: 'error_changing_password' });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f5f5f5" px={2}>
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <LockResetIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
          {t('change_password')}
        </Typography>
        <Typography variant="body2" mb={2}>
          {t('enter_new_password')}
        </Typography>

        <TextField
          label={t('new_password')}
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label={t('confirm_password')}
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit}
        >
          {t('change_password')}
        </Button>
      </Paper>
    </Box>
  );
};

export default PasswordChangePage;
