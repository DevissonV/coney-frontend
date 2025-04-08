import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const GenericCard = ({
  title,
  subtitle,
  content,
  footer,
  icon,
  backgroundColor = 'primary.main',
  headerStyle = {}, // Nueva prop para personalizar el estilo del encabezado
}) => {
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
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        {/* Encabezado */}
        <Box
          sx={{
            bgcolor: backgroundColor,
            color: 'white',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...headerStyle, // Aplica estilos personalizados
          }}
        >
          {icon && <Box mr={1}>{icon}</Box>}
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>

        {/* Contenido */}
        <CardContent>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              {subtitle}
            </Typography>
          )}
          {content}
        </CardContent>

        {/* Pie de página */}
        {footer && (
          <Box
            sx={{
              p: 1,
              bgcolor: 'background.default',
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
