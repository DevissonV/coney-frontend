import {
  Card,
  Avatar,
  Typography,
  Box,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { ROLE_ADMIN, ROLE_USER } from '../../utils/generic/constants';
import { motion } from 'framer-motion';

const UserCard = ({ user, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullName = `${user.first_name} ${user.last_name}`;

  const roleColor =
    user.role === ROLE_ADMIN
      ? theme.palette.error.main
      : user.role === ROLE_USER
        ? theme.palette.warning.main
        : theme.palette.primary.main;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ margin: 8 }}
    >
      <Card
        sx={{
          width: { xs: 250, sm: 300, md: 340 },
          height: { xs: 320, sm: 350, md: 380 },
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: 2,
          boxShadow: theme.shadows[4],
        }}
      >
        <Avatar
          alt={fullName}
          src={user.photo_url || ''}
          sx={{
            width: { xs: 100, sm: 120, md: 140 },
            height: { xs: 100, sm: 120, md: 140 },
            mb: 2,
          }}
        />

        <Chip
          label={user.role}
          size="small"
          sx={{
            mt: 0.5,
            mb: 1,
            color: 'white',
            backgroundColor: roleColor,
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        />

        <Box textAlign="center">
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
            noWrap
          >
            {fullName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              wordBreak: 'break-word',
              fontSize: { xs: '0.8rem', md: '0.9rem' },
            }}
          >
            {user.email}
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <IconButton
            aria-label={t('edit')}
            color="primary"
            onClick={() => onEdit(user.id)}
          >
            <EditIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>
          <IconButton
            aria-label={t('delete')}
            color="error"
            onClick={() => onDelete(user.id)}
          >
            <DeleteIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>
        </Box>
      </Card>
    </motion.div>
  );
};

export default UserCard;
