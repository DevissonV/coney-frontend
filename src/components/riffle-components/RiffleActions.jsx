import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useTranslation } from 'react-i18next';
import { ROLE_ADMIN } from '../../utils/generic/constants';
import { useNavigate } from 'react-router-dom';

const RiffleActions = ({ riffleId, onEdit, onDelete, onViewTickets }) => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate(); // Crear una instancia de useNavigate

  // Función para manejar la navegación a la ruta de tickets con el parámetro riffleId
  const handleViewTickets = (riffleId) => {
    navigate(`/tickets/${riffleId}`);
  };
  console.log(riffleId);
  return (
    <>
      {user?.role === ROLE_ADMIN && (
        <>
          <Tooltip title={t('edit_riffle')}>
            <IconButton color="primary" onClick={() => onEdit(riffleId)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('delete_riffle')}>
            <IconButton color="error" onClick={() => onDelete(riffleId)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title={t('view_tickets')}>
        <ArrowForwardIcon
          color="info"
          onClick={() => handleViewTickets(riffleId)}
        >
          <VisibilityIcon />
        </ArrowForwardIcon>
        {/* <IconButton color="info" onClick={() => onViewTickets(riffleId)}>
          <VisibilityIcon />
        </IconButton> */}
      </Tooltip>
    </>
  );
};

export default RiffleActions;
