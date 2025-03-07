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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers';
import { errorAlert } from '../../services/generic/AlertService';

/**
 * Modal component for resending user activation emails.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Controls whether the modal is open.
 * @param {Function} props.onClose - Function to handle closing the modal.
 */
const UserResendActivationModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { handleResendEmail } = useUsers();

  /**
   * Handles the email resend action.
   * If the email is valid, it triggers the resend email function.
   * Otherwise, it shows an error alert.
   */
  const handleResend = async () => {
    if (email) {
      try {
        await handleResendEmail(email);
        onClose();
      } catch {
        errorAlert({ messageKey: 'error_resending_email' });
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
        <DialogTitle>{t('resend_activation_email')}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <TextField
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
        <Button onClick={handleResend} color="primary">
          {t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserResendActivationModal;
