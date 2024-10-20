import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next'; 

const NotFoundPage = () => {
  const { t } = useTranslation(); 

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h1" component="div">
        404
      </Typography>
      <Typography variant="h4" component="div">
        {t('page_not_found')} 
      </Typography>
      <Typography variant="body1" mt={2}>
        {t('not_found_message')} 
        <Link to="/"> {t('back_to_home')}</Link> 
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
