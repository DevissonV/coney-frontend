import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    IconButton,
    InputAdornment,
    Box,
    Avatar,
    Typography
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import GavelIcon from '@mui/icons-material/Gavel';
  import DescriptionIcon from '@mui/icons-material/Description';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { useTranslation } from 'react-i18next';
  import { useEffect } from 'react';
  import { z } from 'zod';
  
  const authorizationSchema = z.object({
    ticketText: z.string().min(10, 'ticket_text_min').max(300, 'ticket_text_max'),
  });
  
  const AuthorizationCreateForm = ({ open = true, onClose = () => {}, onSubmit, initialValue }) => {
    const { t } = useTranslation();
  
    const {
      register,
      handleSubmit,
      reset,
      trigger,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(authorizationSchema),
      defaultValues: { ticketText: '' },
    });
  
    useEffect(() => {
      reset({ ticketText: initialValue || '' });
    }, [initialValue, reset]);
  
    const onSubmitForm = async (data) => {
      const valid = await trigger();
      if (!valid) return;
      await onSubmit(data);
      onClose();
      reset();
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box textAlign="center" pt={3} px={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
            <GavelIcon fontSize="large" />
          </Avatar>
          <DialogTitle sx={{ fontWeight: 700 }}>{t('create_authorization')}</DialogTitle>
          <Typography variant="body2" sx={{ mb: 2 }}>{t('create_authorization_description')}</Typography>
        </Box>
  
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
  
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <TextField
              label={t('ticket_text')}
              fullWidth
              margin="normal"
              {...register('ticketText')}
              error={!!errors.ticketText}
              helperText={errors.ticketText && t(errors.ticketText.message)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              multiline
              minRows={4}
            />
  
            <Box mt={3} textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                {t('save')}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AuthorizationCreateForm;
  