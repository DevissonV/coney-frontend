import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userEditSchema } from '../../utils/validations/users/userSchema';
import { formatName } from '../../utils/generic/convertText';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';
import { useEffect, useState } from 'react';

const UserEditModal = ({ open, onClose, currentUser, onEditUser }) => {
  const { t } = useTranslation();
  const { user: loggedUser,updateUser } = useAuthStore();
  const canEditRole = loggedUser?.role === ROLE_ADMIN;

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        role: currentUser.role,
      });
      setPreview(currentUser.photo_url || null);
      setPhoto(null);
    }
  }, [currentUser, reset]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    if (canEditRole && (!data.role || data.role.length < 2)) {
      return setValue('role', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  
    const formattedUser = {
      ...data,
      firstName: formatName(data.firstName),
      lastName: formatName(data.lastName),
    };
  
    onEditUser(currentUser.id, formattedUser, photo);
  
    if (photo) {
      updateUser({ photo_url: preview });
    }
  
    handleClose();
  };
  
  const handleClose = () => {
    reset();
    setPhoto(null);
    setPreview(null);
    onClose();
  };
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-user-modal"
      aria-describedby="edit-user-modal-description"
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
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {t('edit_user')}
        </Typography>

        <Box display="flex" justifyContent="center" my={2}>
          <Avatar
            src={preview || ''}
            alt="User preview"
            sx={{ width: 80, height: 80 }}
          />
        </Box>

        {!currentUser?.photo_url && !preview && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mb: 2 }}
          >
            {t('please_upload_photo')}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('first_name')}
            fullWidth
            margin="normal"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName && t(errors.firstName.message)}
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            label={t('last_name')}
            fullWidth
            margin="normal"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName && t(errors.lastName.message)}
            inputProps={{ maxLength: 50 }}
          />

          {canEditRole && (
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>{t('role')}</InputLabel>
              <Select
                label={t('role')}
                {...register('role')}
                defaultValue={currentUser?.role || ''}
              >
                <MenuItem value="admin">{t('admin')}</MenuItem>
                <MenuItem value="user">{t('user')}</MenuItem>
              </Select>
              {errors.role && (
                <Typography color="error">{t(errors.role.message)}</Typography>
              )}
            </FormControl>
          )}

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

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!currentUser?.photo_url && !preview}
            >
              {t('save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

UserEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  onEditUser: PropTypes.func.isRequired,
};

export default UserEditModal;
