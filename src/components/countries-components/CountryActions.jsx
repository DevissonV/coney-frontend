import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * CountryActions component renders action buttons for editing and deleting a country.
 *
 * @param {Object} props - The component props.
 * @param {string} props.countryId - The ID of the country.
 * @param {function} props.onEdit - Callback function to handle edit action.
 * @param {function} props.onDelete - Callback function to handle delete action.
 * @returns {JSX.Element} The rendered component.
 */
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
