import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users/useUsers';
import { errorAlert } from '../../services/generic/AlertService';

const schema = z.object({
  email: z.string().email('Correo inválido'),
});

const UserPasswordRecoveryModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { handleRecoverPassword } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }) => {
    try {
      await handleRecoverPassword(email);
      reset();
      onClose();
    } catch {
      errorAlert({ messageKey: 'error_recovering_password' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pt: 1 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box textAlign="center" mt={-3}>
        <Avatar
          sx={{ bgcolor: 'primary.main', mx: 'auto', width: 56, height: 56 }}
        >
          <EmailIcon />
        </Avatar>
        <DialogTitle sx={{ fontWeight: 700, mt: 1 }}>
          {t('recover_password')}
        </DialogTitle>
        <Typography variant="body2" sx={{ px: 3, mb: 2 }}>
          {t('recover_password_instruction')}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <TextField
            label={t('email')}
            type="email"
            fullWidth
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isSubmitting}
          >
            {t('send')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserPasswordRecoveryModal;
