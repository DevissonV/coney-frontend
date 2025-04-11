import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../utils/validations/users/userSchema';
import { formatName } from '../../utils/generic/convertText';
import {
  containsDangerousCharacters,
  hasSQLInjectionPatterns,
} from '../../utils/generic/securityValidations';
import { errorAlert } from '../../services/generic/AlertService.js';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useState } from 'react';

const UserCreateModal = ({ open, onClose, onCreateUser }) => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const handleClose = () => {
    reset();
    setPhoto(null);
    setPreview(null);
    onClose();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    if (
      containsDangerousCharacters(data.firstName) ||
      hasSQLInjectionPatterns(data.firstName) ||
      containsDangerousCharacters(data.lastName) ||
      hasSQLInjectionPatterns(data.lastName)
    ) {
      errorAlert({ messageKey: 'error_invalid_input' });
      return handleClose();
    }

    const formattedUser = {
      ...data,
      firstName: formatName(data.firstName),
      lastName: formatName(data.lastName),
    };

    onCreateUser(formattedUser, photo);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-user-modal"
      aria-describedby="create-user-modal-description"
    >
      <Box
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          position: 'absolute',
          textAlign: 'center',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Avatar
          src={preview || ''}
          sx={{
            bgcolor: preview ? 'transparent' : 'primary.main',
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
          }}
        >
          {!preview && <GroupAddIcon fontSize="large" />}
        </Avatar>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {!user ? t('join_coney') : t('create_user')}
        </Typography>

        {!user && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('create_account_to_play')}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('email')}
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email && t(errors.email.message)}
            inputProps={{ maxLength: 100 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t('first_name')}
            fullWidth
            margin="normal"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName && t(errors.firstName.message)}
            inputProps={{ maxLength: 50 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t('last_name')}
            fullWidth
            margin="normal"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName && t(errors.lastName.message)}
            inputProps={{ maxLength: 50 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t('password')}
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password && t(errors.password.message)}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2, textTransform: 'none' }}
          >
            {t('upload_photo')}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </Button>

          <Box mt={3}>
            <Button type="submit" variant="contained" fullWidth size="large">
              {t(!user ? 'register' : 'save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

UserCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired,
};

export default UserCreateModal;
