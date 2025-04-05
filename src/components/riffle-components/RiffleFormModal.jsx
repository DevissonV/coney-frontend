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

  const [raffleName, setRaffleName] = useState(initialValues.name || '');
  const [raffleDescription, setRaffleDescription] = useState(
    initialValues.description || '',
  );
  const [initDate, setInitDate] = useState(
    formatDateForInput(initialValues.init_date),
  );
  const [endDate, setEndDate] = useState(
    formatDateForInput(initialValues.end_date),
  );
  const [rafflePrice, setRafflePrice] = useState(
    initialValues.price ? parseFloat(initialValues.price).toString() : ''
  );
  const [raffleTicketCount, setRaffleTicketCount] = useState(initialValues.tickets_created || '');


  useEffect(() => {
    if (initialValues && initialValues.name) {
      setRaffleName(initialValues.name);
      setRaffleDescription(initialValues.description || '');
      setInitDate(formatDateForInput(initialValues.init_date));
      setEndDate(formatDateForInput(initialValues.end_date));
      setRafflePrice(initialValues.price ? parseFloat(initialValues.price).toString() : '');
      setRaffleTicketCount(initialValues.tickets_created);
    } else {
      setRaffleName('');
      setRaffleDescription('');
      setInitDate(getLocalDateTime());
      setEndDate(getLocalDateTime());
      setRafflePrice('');
      setRaffleTicketCount('');
    }
  }, [initialValues]);

  const handleSubmit = () => {
    onSubmit({
      name: raffleName,
      description: raffleDescription,
      initDate,
      endDate,
      price: rafflePrice,
      ticketCount: raffleTicketCount,
    });
    onClose();
  };

  const handleisFormValid = () => {
    return (
      (raffleName || '').trim() !== '' &&
      (raffleDescription || '').trim() !== '' &&
      (initDate || '').trim() !== '' &&
      (endDate || '').trim() !== '' &&
      (rafflePrice || '').toString().trim() !== '' &&
      (raffleTicketCount || '').toString().trim() !== ''
    );
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
          value={raffleName}
          onChange={(e) => setRaffleName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t('description')}
          value={raffleDescription}
          onChange={(e) => setRaffleDescription(e.target.value)}
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
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          label={t('price')}
          value={rafflePrice}
          onChange={(e) => setRafflePrice(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label={t('ticketCount')}
          value={raffleTicketCount}
          onChange={(e) => setRaffleTicketCount(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!!initialValues.name}
        />
      </DialogContent>
      <div style={{ textAlign: 'right', padding: '16px' }}>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!handleisFormValid()}
        >
          {t('save')}
        </Button>
      </div>
    </Dialog>
  );
};

export default RiffleFormModal;
