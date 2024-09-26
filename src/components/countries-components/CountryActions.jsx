import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CountryActions = ({ countryId, onEdit, onDelete }) => (
  <>
    <IconButton color="primary" onClick={() => onEdit(countryId)}>
      <EditIcon />
    </IconButton>
    <IconButton color="error" onClick={() => onDelete(countryId)}>
      <DeleteIcon />
    </IconButton>
  </>
);

export default CountryActions;
