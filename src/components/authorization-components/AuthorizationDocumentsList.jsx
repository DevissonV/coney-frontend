import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Grid,
    Card,
    CardContent,
    CardActions,
    useTheme,
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import CancelIcon from '@mui/icons-material/Cancel';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import { useTranslation } from 'react-i18next';
  import { DOCUMENT_TYPE_OPTIONS } from '../../utils/generic/documentTypes';
  import dayjs from 'dayjs';
  
  /**
   * Displays expected document types with uploaded status and actions.
   * Only one document per type is shown.
   *
   * @param {Object} props
   * @param {Array} props.documents - List of uploaded document objects
   * @param {Function} props.onDelete - Function to delete a document by its ID
   */
  const AuthorizationDocumentsList = ({ documents = [], onDelete }) => {
    const { t } = useTranslation();
    const theme = useTheme();
  
    const getTypeInfo = (type) =>
      DOCUMENT_TYPE_OPTIONS.find((d) => d.value === type) ?? {
        labelKey: type,
        icon: null,
      };
  
    return (
      <Box mt={2}>
        <Grid container spacing={2}>
          {DOCUMENT_TYPE_OPTIONS.map(({ value, labelKey, icon }) => {
            const doc = documents.find((d) => d.type === value);
            const uploaded = Boolean(doc);
  
            return (
              <Grid key={value} item xs={12} sm={6}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    backgroundColor: uploaded
                      ? theme.palette.mode === 'dark'
                        ? '#1e4620'
                        : '#e6f4ea'
                      : theme.palette.mode === 'dark'
                      ? '#2a2a2a'
                      : '#f5f5f5',
                    borderColor: uploaded
                      ? theme.palette.success.main
                      : theme.palette.divider,
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      {icon}
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t(labelKey)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      {uploaded ? (
                        <>
                          <CheckCircleIcon color="success" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {t('uploaded_at')}: {dayjs(doc.uploaded_at).format('DD MMM YYYY HH:mm')}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <CancelIcon color="error" fontSize="small" />
                          <Typography variant="body2" color="error">
                            {t('not_uploaded')}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </CardContent>
                  {uploaded && (
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Tooltip title={t('view')}>
                        <IconButton
                          component="a"
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('delete')}>
                        <IconButton color="error" onClick={() => onDelete(doc.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  export default AuthorizationDocumentsList;
  