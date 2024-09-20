import React from 'react'
import { Paper, Typography, Box } from '@mui/material'

const DashboardWidget = ({ title, value }) => {
  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Paper>
  )
}

export default DashboardWidget
