import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { errorAlert } from '../../services/generic/alertService';

const LoginPage = ({ onLogin, error, loading }) => {
  const { t } = useTranslation(); // Hook para usar traducciones
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password) {
      errorAlert({ messageKey: 'missing_fields' });
      return;
    }

    onLogin({ email, password });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ overflow: 'hidden' }} // Agregado para evitar scroll
    >
      <Typography variant="h4" gutterBottom>
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
        />
        <TextField
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? t('loading') : t('signin')}
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
