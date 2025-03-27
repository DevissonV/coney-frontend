import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/auth/useAuthStore';
import { login } from '../../services/auth/AuthService';
import LoginPage from '../../pages/auth/LoginPage';
import { toast, errorAlert } from '../../services/generic/AlertService';

/**
 * Container component for handling user authentication.
 * It manages login requests and state, and navigates to the dashboard upon successful login.
 * @component
 */
const AuthContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUserAndToken = useAuthStore((state) => state.setUserAndToken);

  /**
   * Handles user login.
   * @param {Object} credentials - User login credentials.
   * @param {string} credentials.email - The user's email.
   * @param {string} credentials.password - The user's password.
   */
  const handleLogin = async (credentials) => {
    const { email, password } = credentials;

    if (!email || !password) {
      return errorAlert({ messageKey: 'missing_fields' });
    }

    setLoading(true);

    try {
 
      const { user, token } = await login(credentials);
      setUserAndToken(user, token);
      toast({ icon: 'success', titleKey: 'login_success' });
      navigate('/dashboard');
    } catch {
      errorAlert({ messageKey: 'invalid_credentials' });
    } finally {
      setLoading(false);
    }
  };

 

  return <LoginPage onLogin={handleLogin} loading={loading} />;
};

export default AuthContainer;
