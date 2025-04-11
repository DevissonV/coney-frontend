import {
    Card,
    Avatar,
    Typography,
    Box,
    IconButton,
    useTheme,
  } from '@mui/material';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { useTranslation } from 'react-i18next';
  import { Chip } from '@mui/material';
  import { 
    ROLE_USER,
    ROLE_ADMIN,
  } from '../../utils/generic/constants';

  
  const UserCard = ({ user, onEdit, onDelete }) => {
    const { t } = useTranslation();
    const theme = useTheme();
  
    const fullName = `${user.first_name} ${user.last_name}`;
  
    return (
      <Card
        sx={{
          width: { xs: 250, sm: 300, md: 340 },
          height: { xs: 320, sm: 350, md: 380 },
          m: 1,
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
            backgroundColor:
              user.role === ROLE_ADMIN
                ? theme.palette.error.main
                : user.role === ROLE_USER
                ? theme.palette.warning.main
                : theme.palette.primary.main,
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
            sx={{ wordBreak: 'break-word', fontSize: { xs: '0.8rem', md: '0.9rem' } }}
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
    );
  };
  
  export default UserCard;
  