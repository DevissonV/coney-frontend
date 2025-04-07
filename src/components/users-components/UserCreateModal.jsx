import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const UserCreateModal = ({ open, onClose, onCreateUser }) => {
  const { t } = useTranslation();

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
    onClose();
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

    onCreateUser(formattedUser);
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
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {t('create_user')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('email')}
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email && t(errors.email.message)}
            inputProps={{ maxLength: 100 }}
          />
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
          <TextField
            label={t('password')}
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password && t(errors.password.message)}
            inputProps={{ maxLength: 20 }}
          />

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

UserCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired,
};

export default UserCreateModal;
