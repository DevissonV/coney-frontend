import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import {
  getLocalDateTime,
  formatDateForInput,
} from '../../utils/generic/transformDates';

const RiffleFormModal = ({ open, onClose, onSubmit, initialValues }) => {
  const { t } = useTranslation();

  const [riffleName, setRiffleName] = useState(initialValues.name || '');
  const [riffleDescription, setRiffleDescription] = useState(
    initialValues.description || '',
  );
  const [initDate, setInitDate] = useState(
    formatDateForInput(initialValues.initDate),
  );
  const [endtDate, setendtDate] = useState(
    formatDateForInput(initialValues.endtDate),
  );

  useEffect(() => {
    if (initialValues && initialValues.name) {
      setRiffleName(initialValues.name);
      setRiffleDescription(initialValues.description || '');
      setInitDate(formatDateForInput(initialValues.initDate));
      setendtDate(formatDateForInput(initialValues.endtDate));
    } else {
      setRiffleName('');
      setRiffleDescription('');
      setInitDate(getLocalDateTime());
      setendtDate(getLocalDateTime());
    }
  }, [initialValues]);

  const handleSubmit = () => {
    onSubmit({
      name: riffleName,
      description: riffleDescription,
      initDate,
      endtDate,
    });
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialValues.name ? t('edit_riffle') : t('create_riffle')}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label={t('name')}
          value={riffleName}
          onChange={(e) => setRiffleName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t('description')}
          value={riffleDescription}
          onChange={(e) => setRiffleDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t('initDate')}
          type="datetime-local"
          value={initDate}
          onChange={(e) => setInitDate(e.target.value)}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          label={t('endDate')}
          type="datetime-local"
          value={endtDate}
          onChange={(e) => setendtDate(e.target.value)}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
      </DialogContent>
      <div style={{ textAlign: 'right', padding: '16px' }}>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
        >
          {t('save')}
        </Button>
      </div>
    </Dialog>
  );
};

export default RiffleFormModal;
