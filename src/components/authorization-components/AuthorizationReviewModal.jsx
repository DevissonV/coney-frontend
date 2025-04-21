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
    Avatar,
  } from '@mui/material';
  import { useState } from 'react';
  import { useTranslation } from 'react-i18next';
  
  const AuthorizationReviewModal = ({ open, onClose, onSubmit, raffle }) => {
    const { t } = useTranslation();
    const [decision, setDecision] = useState('approved');
    const [rejectionReason, setRejectionReason] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleDecisionChange = (event) => {
      setDecision(event.target.value);
      if (event.target.value === 'approved') setRejectionReason('');
    };
  
    const handleSubmit = async () => {
      setLoading(true);
      try {
        await onSubmit({
          status: decision,
          rejectionReason: decision === 'rejected' ? rejectionReason : '',
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
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <Avatar
              variant="rounded"
              src={raffle?.image_url}
              alt={raffle?.name}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h6" gutterBottom>
                {raffle?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {raffle?.description}
              </Typography>
            </Box>
          </Box>
  
          <Stack spacing={2}>
            <RadioGroup value={decision} onChange={handleDecisionChange} row>
              <FormControlLabel value="approved" control={<Radio />} label={t('approve')} />
              <FormControlLabel value="rejected" control={<Radio />} label={t('reject')} />
            </RadioGroup>
  
            {decision === 'rejected' && (
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
            color={decision === 'approved' ? 'success' : 'error'}
            disabled={loading || (decision === 'rejected' && rejectionReason.trim() === '')}
          >
            {t('submit_decision')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AuthorizationReviewModal;