import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RiffleActions = ({ riffleId, onEdit, onDelete }) => (
  <>
    <IconButton color="primary" onClick={() => onEdit(riffleId)}>
      <EditIcon />
    </IconButton>
    <IconButton color="error" onClick={() => onDelete(riffleId)}>
      <DeleteIcon />
    </IconButton>
  </>
);

export default RiffleActions;
