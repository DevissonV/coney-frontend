import { useState } from 'react'; 
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const UserActions = ({ userId, email, isEmailValidated, isUserAuthorized, onEdit, onDelete, onApprove }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const handleEdit = () => {
    onEdit(userId); 
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(userId); 
    } finally {
      setIsDeleting(false); 
    }
  };

  const handleApprove = () => {
    onApprove(email);
  };

  return (
    <div>
      <Tooltip title={t('edit')}> 
        <IconButton color="primary" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('delete')}> 
        <IconButton color="error" onClick={handleDelete} disabled={isDeleting}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {isEmailValidated && isUserAuthorized == null && (
        <Tooltip title={t('approve')}> 
          <IconButton color="success" onClick={handleApprove}>
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

UserActions.propTypes = {
  userId: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  isEmailValidated: PropTypes.bool,
  isUserAuthorized: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default UserActions;
