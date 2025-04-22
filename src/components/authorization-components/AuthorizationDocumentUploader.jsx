import {
    Box,
    Typography,
    Button,
    TextField,
    MenuItem,
    Stack,
    ListItemIcon,
    ListItemText,
    Paper,
    useTheme
  } from '@mui/material';
  import UploadFileIcon from '@mui/icons-material/UploadFile';
  import { useState, useRef } from 'react';
  import { useTranslation } from 'react-i18next';
  import { DOCUMENT_TYPE_OPTIONS } from '../../utils/generic/documentTypes';
  
  const AuthorizationDocumentUploader = ({ onUpload, uploadedTypes = [] }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const inputRef = useRef();
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
  
    const handleFileChange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) setFile(newFile);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) setFile(droppedFile);
    };
  
    const handleUpload = () => {
      if (!file || !type) return;
      onUpload(file, type);
      setFile(null);
      setType('');
    };
  
    const availableOptions = DOCUMENT_TYPE_OPTIONS.filter(
      (opt) => !uploadedTypes.includes(opt.value)
    );
  
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('upload_document')}
        </Typography>
  
        <Stack spacing={2}>
          <TextField
            select
            label={t('document_type')}
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            {availableOptions.map(({ value, labelKey, icon }) => (
              <MenuItem key={value} value={value}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{t(labelKey)}</ListItemText>
              </MenuItem>
            ))}
          </TextField>
  
          <Paper
            elevation={2}
            sx={{
              p: 4,
              border: '2px dashed',
              borderColor: theme.palette.primary.main,
              borderRadius: 2,
              textAlign: 'center',
              bgcolor: theme.palette.mode === 'dark' ? '#2e2e2e' : '#fafafa',
              cursor: 'pointer',
            }}
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <UploadFileIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="body1" mt={1}>
              {t('drag_and_drop_here')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('or_click_to_select')}
            </Typography>
            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Paper>
  
          {file && (
            <Typography variant="body2" mt={1} color="text.secondary">
              {t('selected_file')}: <strong>{file.name}</strong>
            </Typography>
          )}
  
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            disabled={!file || !type}
            onClick={handleUpload}
          >
            {t('upload')}
          </Button>
        </Stack>
      </Box>
    );
  };
  
  export default AuthorizationDocumentUploader;
  