import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/auth/useAuthStore';

/**
 * Wrapper component that protects routes by checking user authentication.
 * If no authentication token is found, it redirects to the login page.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} Protected children or a redirect to the login page.
 */
const AuthWrapper = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthWrapper;
