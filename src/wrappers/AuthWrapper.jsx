import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/auth/useAuthStore';

const AuthWrapper = ({ children }) => {
  const token = useAuthStore((state) => state.token); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default AuthWrapper;
