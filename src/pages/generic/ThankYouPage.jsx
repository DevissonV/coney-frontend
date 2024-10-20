import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ThankYouPage = () => {
  const { t } = useTranslation();

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
        {t('thank_you')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('thank_you_message')}
      </Typography>
      <Button component={Link} to="/login" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
        {t('go_to_login')}
      </Button>
    </Box>
  );
};

export default ThankYouPage;
