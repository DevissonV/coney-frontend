import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { raffleSchema } from '../../utils/validations/raffles/raffleSchema';
import { useEffect } from 'react';

const RiffleFormModal = ({ open, onClose, onSubmit, initialValues }) => {
  const { t } = useTranslation();
  const isEdit = !!initialValues.name;

  const {
    register,
    handleSubmit,
    control,
    reset,
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
    } else {
      reset({
        name: '',
        description: '',
        initDate: dayjs(),
        endDate: dayjs(),
        price: '',
        ticketCount: '',
      });
    }
  }, [initialValues, reset, isEdit]);

  const onSubmitForm = (data) => {
    onSubmit({
      ...data,
      initDate: dayjs(data.initDate).toISOString(),
      endDate: dayjs(data.endDate).toISOString(),
    });
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? t('edit_riffle') : t('create_riffle')}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            label={t('name')}
            fullWidth
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name && t(errors.name.message)}
          />
          <TextField
            label={t('description')}
            fullWidth
            margin="normal"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description && t(errors.description.message)}
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
          />
          <TextField
            label={t('ticketCount')}
            fullWidth
            margin="normal"
            {...register('ticketCount')}
            error={!!errors.ticketCount}
            helperText={errors.ticketCount && t(errors.ticketCount.message)}
            disabled={isEdit}
          />

          <div style={{ textAlign: 'right', paddingTop: '16px' }}>
            <Button type="submit" variant="contained" color="primary">
              {t('save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RiffleFormModal;
