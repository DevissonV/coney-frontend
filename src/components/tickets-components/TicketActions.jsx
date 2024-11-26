import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuthStore from '../../stores/auth/useAuthStore';
import { useTranslation } from 'react-i18next';
import { ROLE_ADMIN } from '../../utils/generic/constants';

const TicketActions = ({ ticketId, onEdit, onDelete }) => {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t('reserve_ticket')}>
        <IconButton color="primary" onClick={onEdit}>
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>

      {user?.role === ROLE_ADMIN && (
        <>
          <Tooltip title={t('delete_ticket')}>
            <IconButton color="error" onClick={() => onDelete(ticketId)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
};

export default TicketActions;
