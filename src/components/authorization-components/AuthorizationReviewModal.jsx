import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Box,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewAuthorizationSchema } from '../../utils/validations/authorizations/authorizationSchema';
import {
  AUTHORIZATION_STATUS_APPROVED,
  AUTHORIZATION_STATUS_REJECTED,
} from '../../utils/generic/constants';
import { useEffect, useState } from 'react';

const AuthorizationReviewModal = ({ open, onClose, onSubmit, raffle }) => {
  const { t } = useTranslation();
  const [decision, setDecision] = useState(AUTHORIZATION_STATUS_APPROVED);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewAuthorizationSchema),
    defaultValues: {
      rejectionReason: '',
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
      setDecision(AUTHORIZATION_STATUS_APPROVED);
    }
  }, [open, reset]);

  const onSubmitForm = async (data) => {
    if (decision === AUTHORIZATION_STATUS_REJECTED) {
      const isValid = await trigger('rejectionReason');
      if (!isValid) return;
    }

    await onSubmit({
      status: decision,
      rejectionReason: decision === AUTHORIZATION_STATUS_REJECTED ? data.rejectionReason : '',
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
          <FeedbackIcon />
        </Avatar>
        {t('review_authorization')}
      </DialogTitle>

      <DialogContent>
        <Card elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="180"
            image={raffle?.image_url}
            alt={raffle?.name}
            sx={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {raffle?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {raffle?.description}
            </Typography>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Stack spacing={3}>
            <RadioGroup
              value={decision}
              onChange={(e) => {
                setDecision(e.target.value);
                if (e.target.value === AUTHORIZATION_STATUS_APPROVED) {
                  reset({ rejectionReason: '' });
                }
              }}
              row
            >
              <FormControlLabel
                value={AUTHORIZATION_STATUS_APPROVED}
                control={<Radio color="success" />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircleIcon color="success" />
                    {t('approve')}
                  </Box>
                }
              />
              <FormControlLabel
                value={AUTHORIZATION_STATUS_REJECTED}
                control={<Radio color="error" />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <CancelIcon color="error" />
                    {t('reject')}
                  </Box>
                }
              />
            </RadioGroup>

            {decision === AUTHORIZATION_STATUS_REJECTED && (
              <TextField
                label={t('rejection_reason')}
                fullWidth
                multiline
                minRows={3}
                {...register('rejectionReason')}
                error={!!errors.rejectionReason}
                helperText={errors.rejectionReason && t(errors.rejectionReason.message)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CancelIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={onClose}>{t('cancel')}</Button>
              <Button
                type="submit"
                variant="contained"
                color={decision === AUTHORIZATION_STATUS_APPROVED ? 'success' : 'error'}
              >
                {t('submit_decision')}
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorizationReviewModal;
