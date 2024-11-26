import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ThankYouPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login', { replace: true });
    navigate(0);
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
        {t('thank_you')}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px' }}>
        {t('thank_you_message')}
      </Typography>
      <Button
        onClick={handleGoToLogin}
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
      >
        {t('go_to_login')}
      </Button>
    </Box>
  );
};

export default ThankYouPage;
