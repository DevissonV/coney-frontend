import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
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
      }}
    >
      <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
        {t('page_not_found')}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px' }}>
        {t('not_found_message')}
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        {t('back_to_home')}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
