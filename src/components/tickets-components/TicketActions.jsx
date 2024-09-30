import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const TicketActions = ({ ticketId, onEdit, onDelete }) => (
  <>
    <IconButton color="primary" onClick={() => onEdit(ticketId)}>
      <ShoppingCartIcon />
    </IconButton>
    <IconButton color="error" onClick={() => onDelete(ticketId)}>
      <DeleteIcon />
    </IconButton>

  </>
);

export default TicketActions;
