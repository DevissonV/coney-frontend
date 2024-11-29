import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers';
import { errorAlert } from '../../services/generic/AlertService';

const UserResendActivationModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { handleResendEmail } = useUsers();

  const handleResend = async () => {
    if (email) {
      try {
        await handleResendEmail(email); 
        onClose(); 
      } catch (error) {
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        <DialogTitle>{t('resend_activation_email')}</DialogTitle>
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
        <Button onClick={onClose} color="secondary"  variant="contained">
          {t('cancel')}
        </Button>

        <Button onClick={handleResend} color="primary" variant="contained">
          {t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserResendActivationModal;
