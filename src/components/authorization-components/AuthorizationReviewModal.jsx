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
  TextField,
  Stack,
  Box,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AUTHORIZATION_STATUS_APPROVED,
  AUTHORIZATION_STATUS_REJECTED,
} from '../../utils/generic/constants';

const AuthorizationReviewModal = ({ open, onClose, onSubmit, raffle }) => {
  const { t } = useTranslation();
  const [decision, setDecision] = useState(AUTHORIZATION_STATUS_APPROVED);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecisionChange = (event) => {
    setDecision(event.target.value);
    if (event.target.value === AUTHORIZATION_STATUS_APPROVED) {
      setRejectionReason('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({
        status: decision,
        rejectionReason: decision === AUTHORIZATION_STATUS_REJECTED ? rejectionReason : '',
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('review_authorization')}</DialogTitle>
      <DialogContent>
        <Card elevation={3} sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
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

        <Stack spacing={2}>
          <RadioGroup value={decision} onChange={handleDecisionChange} row>
            <FormControlLabel
              value={AUTHORIZATION_STATUS_APPROVED}
              control={<Radio />}
              label={t('approve')}
            />
            <FormControlLabel
              value={AUTHORIZATION_STATUS_REJECTED}
              control={<Radio />}
              label={t('reject')}
            />
          </RadioGroup>

          {decision === AUTHORIZATION_STATUS_REJECTED && (
            <TextField
              label={t('rejection_reason')}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              required
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {t('cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={decision === AUTHORIZATION_STATUS_APPROVED ? 'success' : 'error'}
          disabled={loading || (decision === AUTHORIZATION_STATUS_REJECTED && rejectionReason.trim() === '')}
        >
          {t('submit_decision')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthorizationReviewModal;
