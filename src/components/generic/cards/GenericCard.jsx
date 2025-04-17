import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const GenericCard = ({
  title,
  subtitle,
  content,
  footer,
  icon,
  backgroundColor = 'primary.main',
  headerStyle = {},
  titleColor = 'white',
}) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 3,
          boxShadow: 4,
          bgcolor:
            theme.palette.mode === 'dark' ? '#121212' : 'background.paper',
          color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            bgcolor: backgroundColor,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...headerStyle,
          }}
        >
          {icon && (
            <Box
              mr={1}
              sx={{
                color: titleColor,
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: titleColor,
            }}
          >
            {title}
          </Typography>
        </Box>

        <CardContent
          sx={{
            bgcolor:
              theme.palette.mode === 'dark' ? '#121212' : 'background.default',
            flexGrow: 1,
          }}
        >
          {subtitle && (
            <Typography
              variant="body2"
              color={
                theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.secondary'
              }
              mb={2}
            >
              {subtitle}
            </Typography>
          )}
          {content}
        </CardContent>

        {footer && (
          <Box
            sx={{
              p: 1,
              bgcolor:
                theme.palette.mode === 'dark' ? '#121212' : 'background.paper', // Fondo dinámico para footer
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {footer}
          </Box>
        )}
      </Card>
    </motion.div>
  );
};

export default GenericCard;
