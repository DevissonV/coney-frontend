import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RiffleActions = ({ riffleId, onEdit, onDelete, onViewTickets }) => (
  <>
    <IconButton color="primary" onClick={() => onEdit(riffleId)}>
      <EditIcon />
    </IconButton>
    <IconButton color="error" onClick={() => onDelete(riffleId)}>
      <DeleteIcon />
    </IconButton>
    <IconButton color="info" onClick={() => onViewTickets(riffleId)}>
      <VisibilityIcon />
    </IconButton>
  </>
);

export default RiffleActions;
