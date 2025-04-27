import { Avatar, Typography, Box, IconButton, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ROLE_ADMIN, ROLE_USER } from '../../utils/generic/constants';

const UserCard = ({ user, onEdit, onDelete }) => {
  const theme = useTheme();
  const fullName = `${user.first_name} ${user.last_name}`;

  const roleColor =
    user.role === ROLE_ADMIN
      ? theme.palette.error.main
      : user.role === ROLE_USER
        ? theme.palette.warning.main
        : theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: {
          xs: '80%',
          sm: 'calc(40% - 8px)',
          md: 'calc(25% - 8px)',
        },
        maxWidth: '300px',
        padding: 1.5,
        borderRadius: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        textAlign: 'center',
        gap: 0.5,
        margin: '8px',
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          borderColor: 'rgba(0, 0, 0, 0.6)',
        },
        '&:hover .avatar': {
          transform: 'scale(1.3)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 90,
          height: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={user.photo_url}
          alt={fullName}
          className="avatar"
          sx={{
            width: 60,
            height: 60,
            position: 'absolute',
            top: 5,
            zIndex: 4,
            border: '3px solid black',
            objectFit: 'cover',
            backgroundColor: 'transparent',
            transition: 'transform 0.3s ease',
          }}
        />

        <Box
          sx={{
            width: 80,
            height: 40,
            backgroundColor: theme.palette.grey[800],
            borderRadius: '50px 50px 0 0',
            position: 'absolute',
            top: 65,
          }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          textTransform: 'capitalize',
          marginTop: 1,
          fontSize: '0.9rem',
        }}
      >
        {fullName}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: roleColor,
          fontWeight: 'bold',
          border: `1px solid ${roleColor}`,
          borderRadius: 1,
          padding: '2px 6px',
          fontSize: '0.8rem',
          display: 'inline-block',
        }}
      >
        {user.role}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.5,
          marginTop: 1,
        }}
      >
        <IconButton
          color="primary"
          onClick={() => onEdit(user.id)}
          sx={{ fontSize: '1rem' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => onDelete(user.id)}
          sx={{ fontSize: '1rem' }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserCard;
