import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

const CountryFormModal = ({ open, onClose, onSubmit, initialValues }) => {
  const { t } = useTranslation();
  const [countryName, setCountryName] = useState(initialValues.name || '');

  useEffect(() => {
    if (initialValues && initialValues.name) {
      setCountryName(initialValues.name);
    } else {
      setCountryName(''); 
    }
  }, [initialValues]);

  const handleSubmit = () => {
    onSubmit({ name: countryName });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialValues.name ? t('edit_country') : t('create_country')}
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
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <div style={{ textAlign: 'right', padding: '16px' }}>
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
          {t('save')}
        </Button>
      </div>
    </Dialog>
  );
};

export default CountryFormModal;
