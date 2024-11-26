import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/auth/useAuthStore';
import { login } from '../../services/auth/AuthService';
import LoginPage from '../../pages/auth/LoginPage';
import { toast, errorAlert } from '../../services/generic/AlertService'; 
import { useTranslation } from 'react-i18next';

const AuthContainer = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const setUserAndToken = useAuthStore((state) => state.setUserAndToken);

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
    } catch (err) {
      errorAlert({ messageKey: 'invalid_credentials' }); 
    } finally {
      setLoading(false);
    }
  };

  return <LoginPage onLogin={handleLogin} loading={loading} />;
};

export default AuthContainer;
