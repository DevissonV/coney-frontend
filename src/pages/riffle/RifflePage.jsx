import { useState } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import RiffleTable from '../../components/riffle-components/RiffeTable';
import RiffleFormModal from '../../components/riffle-components/RiffleFormModal';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ROLE_ANONYMOUS } from '../../utils/generic/constants';

const RifflePage = ({
  riffle,
  loading,
  onCreate,
  onEdit,
  onDelete,
  searchQuery,
  onSearchChange,
  openModal,
  setOpenModal,
  riffleToEdit,
  setRiffleToEdit,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { token, user } = useAuthStore(); // Obtenemos el token y el usuario
  const navigate = useNavigate();

  const handleViewTickets = (riffleId) => {
    navigate(`/tickets/${riffleId}`);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent={isMobile ? 'center' : 'space-between'}
        alignItems={isMobile ? 'center' : 'flex-start'}
        mb={2}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          style={{ flexGrow: 1 }}
        >
          {t('riffle')}
        </Typography>

        {/* Verificamos si el usuario está logueado y no es anonymous */}
        {/* {token && user?.role !== ROLE_ANONYMOUS && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              setRiffleToEdit(null);
              setOpenModal(true);
            }}
            sx={{
              mt: isMobile ? 2 : 0,  
              textAlign: 'center'
            }}
          >
            {t('create_riffle')}
          </Button>
        )} */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setRiffleToEdit(null);
            setOpenModal(true);
          }}
          sx={{
            mt: isMobile ? 2 : 0,
            textAlign: 'center',
          }}
        >
          {t('create_riffle')}
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent={isMobile ? 'center' : 'flex-start'}
        alignItems={isMobile ? 'center' : 'flex-start'}
        mb={2}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder={t('search_placeholder_riffle')}
        />
      </Box>

      <RiffleTable
        rows={riffle}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewTickets={handleViewTickets}
      />

      <RiffleFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setRiffleToEdit(null);
        }}
        onSubmit={onSubmit}
        initialValues={riffleToEdit || { name: '' }}
      />
    </Box>
  );
};

export default RifflePage;
