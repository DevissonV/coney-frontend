import { Typography, Box, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

const WelcomeMessage = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Box
      padding={4}
      textAlign="center"
      borderRadius={3}
      bgcolor={theme.palette.background.paper}
      boxShadow={5}
      maxWidth="800px"
      margin="20px auto"
      style={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        {t('welcome')}
      </Typography>
      <Typography 
        variant="h5" 
        gutterBottom 
        color={theme.palette.mode === 'dark' ? 'warning.light' : 'warning.dark'}
        style={{ fontWeight: 'bold' }}
      >
        {t('attention')}
      </Typography>
      <Typography variant="body1" color="textPrimary" paragraph>
        {t('verification_required')}
      </Typography>
      <Typography variant="body1" color="error.main" paragraph>
        {t('check_email')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {t('admin_approval')}
      </Typography>
    </Box>
  )
}

export default WelcomeMessage
