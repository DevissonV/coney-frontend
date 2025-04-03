import { useState, useEffect } from 'react';
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
import { formatName } from '../../utils/generic/convertText';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';

const UserEditModal = ({ open, onClose, currentUser, onEditUser }) => {
  const { t } = useTranslation();
  const { user: loggedUser } = useAuthStore();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  const canEditRole = loggedUser?.role === ROLE_ADMIN;

  useEffect(() => {
    if (currentUser) {
      setUser({
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        role: currentUser.role,
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!user.firstName || user.firstName.length < 2)
      tempErrors.firstName = t('first_name_error');
    if (!user.lastName || user.lastName.length < 2)
      tempErrors.lastName = t('last_name_error');
    if (canEditRole && (!user.role || user.role.length < 2)) {
      tempErrors.role = t('role_error');
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const formattedUser = {
        ...user,
        firstName: formatName(user.firstName),
        lastName: formatName(user.lastName),
        role: user.role,
      };

      onEditUser(currentUser.id, formattedUser);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          {t('edit_user')}
        </Typography>

        <Box component="form">
          <TextField
            label={t('first_name')}
            name="firstName"
            fullWidth
            margin="normal"
            value={user.firstName}
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
            value={user.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            inputProps={{ maxLength: 50 }}
          />

          {canEditRole && (
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>{t('role')}</InputLabel>
              <Select
                label={t('role')}
                name="role"
                value={user.role}
                onChange={handleInputChange}
              >
                <MenuItem value="admin">{t('admin')}</MenuItem>
                <MenuItem value="user">{t('user')}</MenuItem>
              </Select>
              {errors.role && (
                <Typography color="error">{errors.role}</Typography>
              )}
            </FormControl>
          )}

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

UserEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  onEditUser: PropTypes.func.isRequired,
};

export default UserEditModal;
