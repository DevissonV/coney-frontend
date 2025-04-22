import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import useAuthStore from '../../stores/auth/useAuthStore';
import { useTranslation } from 'react-i18next';
import { ROLE_ADMIN, ROLE_ANONYMOUS } from '../../utils/generic/constants';
import { useNavigate } from 'react-router-dom';
import { confirmLogin, confirmWinnerSelection } from '../../services/generic/AlertService';

const RiffleActions = ({
  riffleId,
  availableTickets,
  createdBy,
  onEdit,
  onDelete,
  onViewTickets,
  handleWinner,
}) => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAnonymous = !user || user.role === ROLE_ANONYMOUS;
  const canEditOrDelete = user?.role === ROLE_ADMIN || user?.id === createdBy;
  const canSelectWinner = user?.role === ROLE_ADMIN || user?.id === createdBy;

  const handleProtectedView = async () => {
    if (isAnonymous) {
      const result = await confirmLogin({});
      if (result.isConfirmed) navigate('/login');
      return;
    }

    if (typeof onViewTickets === 'function') {
      onViewTickets(riffleId);
    } else {
      navigate(`/tickets/${riffleId}`);
    }
  };

  const handleProtectedWinner = async () => {
    if (isAnonymous) {
      const result = await confirmLogin({});
      if (result.isConfirmed) navigate('/login');
      return;
    }

    const confirm = await confirmWinnerSelection({});
    if (!confirm.isConfirmed) return;

    if (typeof handleWinner === 'function') {
      handleWinner({ id: riffleId, created_by: createdBy });
    }
  };

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

      {availableTickets > 0 ? (
        <Tooltip title={t('view_tickets')}>
          <IconButton color="info" onClick={handleProtectedView}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('no_tickets_available')}>
          <span>
            <IconButton disabled>
              <VisibilityIcon color="disabled" />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {user &&
        user.role !== ROLE_ANONYMOUS &&
        (canSelectWinner ? (
          <Tooltip title={t('select_winner')}>
            <IconButton onClick={handleProtectedWinner}>
              <EmojiEventsOutlinedIcon sx={{ color: 'goldenrod' }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={t('not_your_riffle')}>
            <span>
              <IconButton disabled>
                <InfoOutlinedIcon color="disabled" />
              </IconButton>
            </span>
          </Tooltip>
        ))}
    </>
  );
};

export default RiffleActions;
