import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useTranslation } from 'react-i18next';
import { ROLE_ADMIN, ROLE_ANONYMOUS } from '../../utils/generic/constants';
import { useNavigate } from 'react-router-dom';
import { confirmLogin } from '../../services/generic/AlertService'; // Usa tu ruta real

const RiffleActions = ({
  riffleId,
  availableTickets,
  createdBy,
  onEdit,
  onDelete,
}) => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewTickets = async (riffleId) => {
    if (!user || user.role === ROLE_ANONYMOUS) {
      const result = await confirmLogin({});
      if (result.isConfirmed) {
        navigate('/login');
      }
      return;
    }

    navigate(`/tickets/${riffleId}`);
  };

  const canEditOrDelete = user?.role === ROLE_ADMIN || user?.id === createdBy;

  return (
    <>
      {canEditOrDelete && (
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

      {availableTickets > 0 && (
        <Tooltip title={t('view_tickets')}>
          <IconButton color="info" onClick={() => handleViewTickets(riffleId)}>
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};


export default RiffleActions;
