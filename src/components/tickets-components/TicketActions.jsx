import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';

const TicketActions = ({ ticketId, onEdit, onDelete }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <IconButton color="primary" onClick={onEdit}>
        <ShoppingCartIcon />
      </IconButton>
      {user?.role === ROLE_ADMIN && (
        <IconButton color="error" onClick={() => onDelete(ticketId)}>
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

export default TicketActions;
