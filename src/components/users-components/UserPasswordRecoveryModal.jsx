import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers';
import { errorAlert } from '../../services/generic/AlertService';

/**
 * Modal component for user password recovery.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Controls whether the modal is open.
 * @param {Function} props.onClose - Function to handle closing the modal.
 */
const UserPasswordRecoveryModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { handleRecoverPassword } = useUsers();

  /**
   * Handles password recovery process.
   * If an email is provided, it triggers the password recovery function.
   * Otherwise, it displays an error alert.
   */
  const handleRecover = async () => {
    if (email) {
      try {
        await handleRecoverPassword(email);
        onClose();
      } catch {
        errorAlert({ messageKey: 'error_recovering_password' });
        onClose();
      }
    } else {
      errorAlert({ messageKey: 'missing_fields' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: 1,
        }}
      >
        <DialogTitle>{t('recover_password')}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin="dense"
          label={t('email')}
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRecover} color="primary" variant="contained">
          {t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserPasswordRecoveryModal;
