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
import { useEffect } from 'react';

const UserEditModal = ({ open, onClose, currentUser, onEditUser }) => {
  const { t } = useTranslation();
  const { user: loggedUser } = useAuthStore();
  const canEditRole = loggedUser?.role === ROLE_ADMIN;

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
    }
  }, [currentUser, reset]);

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

    onEditUser(currentUser.id, formattedUser);
    onClose();
    reset();
  };

  const handleClose = () => {
    reset();
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

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
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
