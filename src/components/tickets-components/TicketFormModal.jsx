import { useEffect, useState } from 'react';
import { Dialog, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TicketFormModal = ({ open, onClose, onSubmit, initialValues }) => {
  const { t } = useTranslation();
  const [ticketTicketNumber, setTicketTicketNumber] = useState(
    initialValues.ticketNumber || ''
  );

  useEffect(() => {
    if (initialValues && initialValues.ticketNumber) {
      setTicketTicketNumber(initialValues.ticketNumber);
    } else {
      setTicketTicketNumber('');
    }
  }, [initialValues]);

  const handleSubmit = () => {
    onSubmit({ ticketNumber: ticketTicketNumber });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
        >
          {t('continue')}
        </Button>
      </div>
    </Dialog>
  );
};

export default TicketFormModal;
