import React from 'react'
import { Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const WelcomeMessage = () => {
  const { t } = useTranslation()

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="body1">
        {t('welcome_message')}
      </Typography>
    </Box>
  )
}

export default WelcomeMessage
