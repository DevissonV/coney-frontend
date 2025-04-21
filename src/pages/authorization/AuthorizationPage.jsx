import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import PaperclipIcon from '@mui/icons-material/AttachFile';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import AuthorizationCreateForm from '../../components/authorization-components/AuthorizationCreateForm';
import AuthorizationDocumentUploader from '../../components/authorization-components/AuthorizationDocumentUploader';
import AuthorizationDocumentsList from '../../components/authorization-components/AuthorizationDocumentsList';
import AuthorizationReviewModal from '../../components/authorization-components/AuthorizationReviewModal';

import useAuthStore from '../../stores/auth/useAuthStore';
import { DOCUMENT_TYPE_OPTIONS } from '../../utils/generic/documentTypes';
import {
  ROLE_ADMIN,
  AUTHORIZATION_STATUS_APPROVED,
  AUTHORIZATION_STATUS_PENDING,
  AUTHORIZATION_STATUS_REJECTED,
} from '../../utils/generic/constants';

const AuthorizationPage = ({
  authorization,
  loading,
  onCreate,
  onUpload,
  onDelete,
  onDeleteDocument,
  onReview,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { user } = useAuthStore();
  const [openReviewModal, setOpenReviewModal] = useState(false);

  if (loading || !authorization) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const uploadedTypes = authorization?.documents?.map((d) => d.type) || [];
  const isRejected = authorization.status === AUTHORIZATION_STATUS_REJECTED;
  const isCreator = String(authorization.created_by?.id || authorization.created_by) === String(user?.id);
  const showReviewButton =
    (authorization.status === AUTHORIZATION_STATUS_PENDING || authorization.status === 'reviewing') &&
    user?.role === ROLE_ADMIN;

  const canResubmit = isRejected && (isCreator || user?.role === ROLE_ADMIN);

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
            {/* Información de la rifa */}
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
                {dayjs(authorization.raffle?.init_date).format('DD MMM')} -{' '}
                {dayjs(authorization.raffle?.end_date).format('DD MMM')}
                <PersonIcon fontSize="small" />
                {authorization.created_by?.first_name} {authorization.created_by?.last_name}
              </Typography>
            </Box>

            {/* Estado */}
            <Box
              sx={{
                backgroundColor:
                  authorization.status === AUTHORIZATION_STATUS_PENDING
                    ? theme.palette.mode === 'dark'
                      ? '#554d00'
                      : '#fff3cd'
                    : authorization.status === AUTHORIZATION_STATUS_APPROVED
                    ? theme.palette.mode === 'dark'
                      ? '#1e4d2b'
                      : '#d4edda'
                    : theme.palette.mode === 'dark'
                    ? '#5c2b2b'
                    : '#f8d7da',
                border: '1px solid',
                borderColor:
                  authorization.status === AUTHORIZATION_STATUS_PENDING
                    ? theme.palette.mode === 'dark'
                      ? '#e0c300'
                      : '#ffeeba'
                    : authorization.status === AUTHORIZATION_STATUS_APPROVED
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

              {isRejected && authorization.rejection_reason && (
                <Typography variant="body2" color="error" mt={1}>
                  {t('rejection_reason')}: "{authorization.rejection_reason}"
                </Typography>
              )}

              {canResubmit && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => onReview({ status: AUTHORIZATION_STATUS_PENDING })}
                  sx={{ mt: 2 }}
                >
                  {t('resubmit_for_review')}
                </Button>
              )}
            </Box>

            {/* Documentos cargados */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom display="flex" alignItems="center" gap={1}>
                <PaperclipIcon fontSize="small" />
                {t('authorization_documents')}
              </Typography>
              <AuthorizationDocumentsList
                documents={authorization.documents}
                onDelete={onDeleteDocument}
              />
            </Box>

            {/* Subida de nuevo documento */}
            {uploadedTypes.length === DOCUMENT_TYPE_OPTIONS.length ? (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: theme.palette.success.main,
                  bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  color="text.primary"
                >
                  <TaskAltIcon fontSize="medium" sx={{ color: theme.palette.success.main }} />
                  {t('all_documents_uploaded')}
                </Typography>
                <Typography variant="body2" mt={1} color="text.secondary">
                  {t('awaiting_admin_review')}
                </Typography>

                {showReviewButton && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenReviewModal(true)}
                    sx={{ mt: 2 }}
                  >
                    {t('review_authorization')}
                  </Button>
                )}
              </Paper>
            ) : (
              <AuthorizationDocumentUploader
                onUpload={onUpload}
                uploadedTypes={uploadedTypes}
              />
            )}

            {/* Botón eliminar autorización */}
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

      {/* Modal de revisión */}
      <AuthorizationReviewModal
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        onSubmit={onReview}
        raffle={authorization.raffle}
      />
    </Box>
  );
};

export default AuthorizationPage;
