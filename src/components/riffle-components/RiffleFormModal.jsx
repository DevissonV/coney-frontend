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
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CasinoIcon from '@mui/icons-material/Casino';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { raffleSchema } from '../../utils/validations/raffles/raffleSchema';
import { useEffect, useState } from 'react';

const RiffleFormModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  loading,
}) => {
  const { t } = useTranslation();
  const isEdit = !!initialValues.name;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(raffleSchema),
    defaultValues: {
      name: '',
      description: '',
      initDate: dayjs(),
      endDate: dayjs(),
      price: '',
      ticketCount: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      reset({
        name: initialValues.name || '',
        description: initialValues.description || '',
        initDate: dayjs(initialValues.init_date),
        endDate: dayjs(initialValues.end_date),
        price: initialValues.price?.toString() || '',
        ticketCount: initialValues.tickets_created || '',
      });

      setFile(null);
      setPreview(initialValues.photo_url || null);
    } else {
      reset({
        name: '',
        description: '',
        initDate: dayjs(),
        endDate: dayjs(),
        price: '',
        ticketCount: '',
      });

      setPreview(null);
      setFile(null);
    }
  }, [initialValues, reset, isEdit]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmitForm = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;

    const payload = {
      ...data,
      initDate: dayjs(data.initDate).toISOString(),
      endDate: dayjs(data.endDate).toISOString(),
    };

    await onSubmit(payload, file);

    reset();
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box textAlign="center" pt={3} px={3}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2,
          }}
        >
          <CasinoIcon fontSize="large" />
        </Avatar>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {isEdit ? t('edit_riffle') : t('create_riffle')}
        </DialogTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {isEdit
            ? t('edit_riffle_description')
            : t('create_riffle_description')}
        </Typography>
      </Box>

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

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            label={t('name')}
            fullWidth
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name && t(errors.name.message)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CasinoIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t('description')}
            fullWidth
            margin="normal"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description && t(errors.description.message)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
          />

          <Controller
            control={control}
            name="initDate"
            render={({ field }) => (
              <DateTimePicker
                label={t('initDate')}
                {...field}
                ampm={false}
                format="DD/MM/YYYY HH:mm"
                value={field.value}
                onChange={(val) => field.onChange(val)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: !!errors.initDate,
                    helperText: errors.initDate && t(errors.initDate.message),
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DateTimePicker
                label={t('endDate')}
                {...field}
                ampm={false}
                format="DD/MM/YYYY HH:mm"
                value={field.value}
                onChange={(val) => field.onChange(val)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: !!errors.endDate,
                    helperText: errors.endDate && t(errors.endDate.message),
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            )}
          />

          <TextField
            label={t('price')}
            fullWidth
            margin="normal"
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price && t(errors.price.message)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t('ticketCount')}
            fullWidth
            margin="normal"
            {...register('ticketCount')}
            error={!!errors.ticketCount}
            helperText={errors.ticketCount && t(errors.ticketCount.message)}
            disabled={isEdit}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumberIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="file"
            label={t('upload_photo')}
            fullWidth
            margin="normal"
            inputProps={{ accept: 'image/*' }}
            onChange={handleFileChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhotoCamera />
                </InputAdornment>
              ),
            }}
          />

          {preview && (
            <Box mt={2} textAlign="center">
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: '100%', borderRadius: 8 }}
              />
            </Box>
          )}

          <Box mt={3} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : t('save')}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RiffleFormModal;
