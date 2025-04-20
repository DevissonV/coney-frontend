import { useParams } from 'react-router-dom';
import { useAuthorization } from '../../hooks/authorization/useAuthorization';
import AuthorizationPage from '../../pages/authorization/AuthorizationPage';

/**
 * Container component for managing raffle authorization by raffle ID.
 */
const AuthorizationContainer = () => {
  const { raffleId } = useParams();

  const {
    authorization,
    loading,
    handleCreateAuthorization,
    handleUploadDocument,
    handleDeleteAuthorization,
  } = useAuthorization(raffleId);

  return (
    <AuthorizationPage
      authorization={authorization}
      loading={loading}
      onCreate={handleCreateAuthorization}
      onUpload={handleUploadDocument}
      onDelete={handleDeleteAuthorization}
      raffleId={raffleId}
    />
  );
};

export default AuthorizationContainer;
