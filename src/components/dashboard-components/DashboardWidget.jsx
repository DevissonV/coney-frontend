import { Paper, Typography, Box } from '@mui/material';

const DashboardWidget = ({ title, value }) => {
  return (
    <Paper elevation={3} style={{ borderRadius: '12px', padding: '20px' }}>
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Typography
          variant="h3"
          color="primary"
          style={{ fontWeight: 'bold', marginTop: '10px' }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DashboardWidget;
