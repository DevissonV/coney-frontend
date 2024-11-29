import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers'; 
import { errorAlert } from '../../services/generic/AlertService';

const UserPasswordRecoveryModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { handleRecoverPassword } = useUsers(); 

  const handleRecover = async () => {
    if (email) {
      try {
        await handleRecoverPassword(email); 
        onClose(); 
      } catch (error) {
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        <DialogTitle>
          {t('recover_password')}
        </DialogTitle>
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
        <Button onClick={onClose} color="secondary"  variant="contained">
          {t('cancel')}
        </Button>
        
        <Button onClick={handleRecover} color="primary" variant="contained">
          {t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserPasswordRecoveryModal;
