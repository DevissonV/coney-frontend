import { Typography, Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers'; 
import { errorAlert, toast } from '../../services/generic/AlertService';

const PasswordChangePage = () => {
  const { t } = useTranslation();
  const { handleChangePassword } = useUsers();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

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
        '@media (max-width: 600px)': {
          marginTop: '60px',
          padding: '20px',
        },
      }}
    >
      <Typography variant="h4" color="primary" fontWeight={700}>
        {t('change_password')}
      </Typography>
      <Typography variant="body1" paragraph>
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
