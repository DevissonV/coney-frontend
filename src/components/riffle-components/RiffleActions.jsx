import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useTranslation } from 'react-i18next';
import { ROLE_ADMIN } from '../../utils/generic/constants';
import { useNavigate } from 'react-router-dom';

/**
 * RiffleActions component renders action buttons for editing, deleting, and viewing tickets related to a riffle.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.riffleId - The ID of the riffle.
 * @param {function} props.onEdit - Callback function to handle the edit action.
 * @param {function} props.onDelete - Callback function to handle the delete action.
 * @returns {JSX.Element} The rendered component.
 *
 */
const RiffleActions = ({ riffleId, onEdit, onDelete }) => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewTickets = (riffleId) => {
    navigate(`/tickets/${riffleId}`);
  };
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
      </Tooltip>
    </>
  );
};

export default RiffleActions;
