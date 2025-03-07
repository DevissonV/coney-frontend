import { Typography, Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const WelcomeMessage = ({
  title,
  subtitle,
  message,
  actionMessage,
  footerMessage,
}) => {
  const theme = useTheme();

  return (
    <Box
      padding={4}
      textAlign="center"
      borderRadius={3}
      bgcolor={theme.palette.background.paper}
      boxShadow={5}
      maxWidth="800px"
      margin="20px auto"
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h5"
          gutterBottom
          color={
            theme.palette.mode === 'dark' ? 'warning.light' : 'warning.dark'
          }
          sx={{ fontWeight: 'bold' }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant="body1"
        color="textPrimary"
        sx={{ marginBottom: '16px' }}
      >
        {message}
      </Typography>
      {actionMessage && (
        <Typography
          variant="body1"
          color="error.main"
          sx={{ marginBottom: '16px' }}
        >
          {actionMessage}
        </Typography>
      )}
      {footerMessage && (
        <Typography variant="body2" color="textSecondary">
          {footerMessage}
        </Typography>
      )}
    </Box>
  );
};

WelcomeMessage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  message: PropTypes.string.isRequired,
  actionMessage: PropTypes.string,
  footerMessage: PropTypes.string,
};

export default WelcomeMessage;
