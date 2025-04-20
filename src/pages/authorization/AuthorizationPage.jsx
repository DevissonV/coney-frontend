import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Stack,
    Chip,
    Button,
    Tooltip,
    useTheme,
  } from '@mui/material';
  import { useTranslation } from 'react-i18next';
  import dayjs from 'dayjs';
  import DeleteIcon from '@mui/icons-material/Delete';
  import UploadFileIcon from '@mui/icons-material/UploadFile';
  import GiftIcon from '@mui/icons-material/CardGiftcard';
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import PersonIcon from '@mui/icons-material/Person';
  import PaperclipIcon from '@mui/icons-material/AttachFile';
  
  import AuthorizationCreateForm from '../../components/authorization-components/AuthorizationCreateForm';
  import AuthorizationDocumentUploader from '../../components/authorization-components/AuthorizationDocumentUploader';
  import { DOCUMENT_TYPE_OPTIONS } from '../../utils/generic/documentTypes';
  
  const AuthorizationPage = ({
    authorization,
    loading,
    onCreate,
    onUpload,
    onDelete,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      );
    }
  
    const getDocumentIcon = (type) => {
      const found = DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === type);
      return found?.icon || <UploadFileIcon fontSize="small" />;
    };
  
    const uploadedTypes = authorization?.documents?.map((d) => d.type) || [];
  
    return (
      <Box px={2} py={4} maxWidth="md" mx="auto">
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          {t('authorization_title')}
        </Typography>
  
        {!authorization ? (
          <AuthorizationCreateForm onSubmit={onCreate} />
        ) : (
          <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
            <Stack spacing={4}>
  s
              <Box>
                <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                  <GiftIcon fontSize="medium" />
                  {authorization.raffle?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {authorization.raffle?.description}
                </Typography>
                <Typography variant="caption" color="primary" display="flex" alignItems="center" gap={1}>
                  <CalendarMonthIcon fontSize="small" />
                  {dayjs(authorization.raffle?.init_date).format('DD MMM')} - {dayjs(authorization.raffle?.end_date).format('DD MMM')}
                  <PersonIcon fontSize="small" />
                  {authorization.created_by?.first_name} {authorization.created_by?.last_name}
                </Typography>
              </Box>
  
              <Box
                sx={{
                  backgroundColor:
                    authorization.status === 'pending'
                      ? theme.palette.mode === 'dark'
                        ? '#554d00'
                        : '#fff3cd'
                      : authorization.status === 'approved'
                      ? theme.palette.mode === 'dark'
                        ? '#1e4d2b'
                        : '#d4edda'
                      : theme.palette.mode === 'dark'
                      ? '#5c2b2b'
                      : '#f8d7da',
                  border: '1px solid',
                  borderColor:
                    authorization.status === 'pending'
                      ? theme.palette.mode === 'dark'
                        ? '#e0c300'
                        : '#ffeeba'
                      : authorization.status === 'approved'
                      ? theme.palette.mode === 'dark'
                        ? '#2ecc71'
                        : '#c3e6cb'
                      : theme.palette.mode === 'dark'
                      ? '#f1948a'
                      : '#f5c6cb',
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.common.white
                      : theme.palette.text.primary,
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {t('authorization_status')}: {t(authorization.status)}
                </Typography>
                <Typography variant="body2">
                  {t('authorization_created_at')}: {dayjs(authorization.created_at).format('DD MMMM YYYY')}
                </Typography>
                <Typography variant="body2" fontStyle="italic">
                  "{authorization.ticket_text}"
                </Typography>
              </Box>
  
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom display="flex" alignItems="center" gap={1}>
                  <PaperclipIcon fontSize="small" />
                  {t('authorization_documents')}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  rowGap={1}
                  useFlexGap
                  flexWrap="wrap"
                >
                  {DOCUMENT_TYPE_OPTIONS.map((doc) => {
                    const uploaded = uploadedTypes.includes(doc.value);
                    return (
                      <Tooltip key={doc.value} title={t(doc.labelKey)} placement="top">
                        <Chip
                          icon={doc.icon}
                          label={t(doc.labelKey)}
                          clickable={false}
                          color={uploaded ? 'success' : 'default'}
                          variant={uploaded ? 'filled' : 'outlined'}
                        />
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Box>
  
              <AuthorizationDocumentUploader
                onUpload={onUpload}
                uploadedTypes={uploadedTypes}
              />
  
              <Box textAlign="right">
                <Button
                  onClick={onDelete}
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  {t('delete_authorization')}
                </Button>
              </Box>
            </Stack>
          </Paper>
        )}
      </Box>
    );
  };
  
  export default AuthorizationPage;
  