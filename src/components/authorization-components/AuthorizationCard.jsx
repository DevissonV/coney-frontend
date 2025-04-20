import {
    Box,
    Typography,
    Chip,
    Tooltip,
    Stack,
    useTheme,
  } from '@mui/material';
  import { useTranslation } from 'react-i18next';
  import dayjs from 'dayjs';
  import UploadFileIcon from '@mui/icons-material/UploadFile';
  import { DOCUMENT_TYPE_OPTIONS } from '../../utils/generic/documentTypes';
  
  /**
   * Displays expected document types for a raffle authorization with status indication.
   * @param {Object} props
   * @param {Object} props.authorization - Contains .documents array at minimum.
   */
  const AuthorizationCard = ({ authorization }) => {
    const { t } = useTranslation();
    const theme = useTheme();
  
    if (!authorization || !authorization.documents) return null;
  
    const getIconByType = (type) => {
      return (
        DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === type)?.icon ?? (
          <UploadFileIcon fontSize="small" />
        )
      );
    };
  
    return (
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          📎 {t('authorization_documents')}
        </Typography>
  
        <Stack direction="row" spacing={1.5} rowGap={1.5} flexWrap="wrap">
          {DOCUMENT_TYPE_OPTIONS.map(({ value, labelKey }) => {
            const doc = authorization.documents.find((d) => d.type === value);
            const uploaded = Boolean(doc);
  
            return (
              <Tooltip
                key={value}
                title={
                  uploaded
                    ? `${t('uploaded_at')}: ${dayjs(doc.uploaded_at).format(
                        'DD MMM HH:mm'
                      )}`
                    : t('not_uploaded')
                }
                placement="top"
              >
                <Chip
                  icon={getIconByType(value)}
                  label={t(labelKey)}
                  component={uploaded ? 'a' : 'div'}
                  href={uploaded ? doc.file_url : undefined}
                  target={uploaded ? '_blank' : undefined}
                  clickable={uploaded}
                  variant="filled"
                  sx={{
                    bgcolor: uploaded
                      ? theme.palette.success.main
                      : theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[200],
                    color: uploaded
                      ? theme.palette.getContrastText(theme.palette.success.main)
                      : theme.palette.text.secondary,
                    opacity: uploaded ? 1 : 0.6,
                    fontWeight: 500,
                    cursor: uploaded ? 'pointer' : 'default',
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
    );
  };
  
  export default AuthorizationCard;
  