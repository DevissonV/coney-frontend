import { Typography, Box, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers'; 
import { errorAlert, toast } from '../../services/generic/AlertService';

const PasswordChangePage = () => {
  const { t } = useTranslation();
  const { handleChangePassword } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('password-change-reloaded');

    if (!hasReloaded) {
      sessionStorage.setItem('password-change-reloaded', 'true');
      window.location.reload();
    }
  }, [location]);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      errorAlert({ messageKey: 'passwords_do_not_match' });
      return;
    }

    try {
      await handleChangePassword(email, newPassword);
      toast({ messageKey: 'password_change_success' });
      navigate('/login');
    } catch (error) {
      errorAlert({ messageKey: 'error_changing_password' });
    }
  };

  return (
    <Box
      padding={4}
      textAlign="center"
      borderRadius={3}
      maxWidth="400px"
      margin="40px auto"
      sx={{
        border: '1px solid',
        boxShadow: 5,
      }}
    >
      <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
        {t('change_password')}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px' }}>
        {t('enter_new_password')}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label={t('email')}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t('new_password')}
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label={t('confirm_password')}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button 
        onClick={handleSubmit}
        variant="contained" 
        color="primary" 
        sx={{ marginTop: '20px' }}
        fullWidth
      >
        {t('change_password')}
      </Button>
      
      <Button component={Link} to="/login" variant="text" sx={{ marginTop: '10px' }}>
        {t('go_to_login')}
      </Button>
    </Box>
  );
};

export default PasswordChangePage;
