import { useState, useEffect } from 'react';
import { Box, Modal, TextField, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers';

const UserChangePasswordModal = ({ open, onClose, userId }) => {
  const { t } = useTranslation();
  const { handleUpdateUser } = useUsers();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setPasswords({
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!passwords.newPassword || passwords.newPassword.length < 6) {
      tempErrors.newPassword = t('password_length_error');
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      tempErrors.confirmPassword = t('passwords_do_not_match');
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      handleUpdateUser(userId, { password: passwords.newPassword });
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="change-password-modal"
      aria-describedby="change-password-modal-description"
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
          {t('change_password')}
        </Typography>
        <Box component="form">
          <TextField
            label={t('new_password')}
            name="newPassword"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.newPassword}
            onChange={handleInputChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
          <TextField
            label={t('confirm_password')}
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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

UserChangePasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default UserChangePasswordModal;
