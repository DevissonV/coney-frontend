import { useState } from 'react'; 
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const UserActions = ({ userId, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    onEdit(userId); 
  };

  const handleDelete = async () => {
    try {
      await onDelete(userId); 
    } finally {
      setIsDeleting(false); 
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={handleDelete} disabled={isDeleting}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

UserActions.propTypes = {
  userId: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserActions;
