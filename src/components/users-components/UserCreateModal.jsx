import { useState, useEffect } from 'react';
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
import { formatName } from '../../utils/generic/convertText';
import {
  containsDangerousCharacters,
  hasSQLInjectionPatterns,
} from '../../utils/generic/securityValidations';
import { errorAlert } from '../../services/generic/AlertService.js';

const UserCreateModal = ({ open, onClose, onCreateUser }) => {
  const { t } = useTranslation();
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      setErrors({});
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (
      containsDangerousCharacters(newUser.firstName) ||
      hasSQLInjectionPatterns(newUser.firstName)
    ) {
      errorAlert({ messageKey: 'error_invalid_input' });
      onClose();
      return false;
    }

    if (
      containsDangerousCharacters(newUser.lastName) ||
      hasSQLInjectionPatterns(newUser.lastName)
    ) {
      errorAlert({ messageKey: 'error_invalid_input' });
      onClose();
      return false;
    }

    if (!newUser.firstName || newUser.firstName.length < 2)
      tempErrors.firstName = t('first_name_error');
    if (!newUser.lastName || newUser.lastName.length < 2)
      tempErrors.lastName = t('last_name_error');
    if (
      !newUser.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.email)
    )
      tempErrors.email = t('email_error');
    if (!newUser.password || newUser.password.length < 6)
      tempErrors.password = t('password_error');

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const formattedUser = {
        ...newUser,
        firstName: formatName(newUser.firstName),
        lastName: formatName(newUser.lastName),
      };

      onCreateUser(formattedUser);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          onClick={onClose}
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
        <Box component="form">
          <TextField
            label={t('first_name')}
            name="firstName"
            fullWidth
            margin="normal"
            value={newUser.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label={t('last_name')}
            name="lastName"
            fullWidth
            margin="normal"
            value={newUser.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label={t('email')}
            name="email"
            fullWidth
            margin="normal"
            value={newUser.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            label={t('password')}
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={newUser.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            inputProps={{ maxLength: 20 }}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
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
