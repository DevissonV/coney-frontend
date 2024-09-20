import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/auth/useAuthStore';
import { login } from '../../services/auth/AuthService';
import LoginPage from '../../pages/auth/LoginPage';
import { useTranslation } from 'react-i18next';
import { toast, errorAlert } from '../../services/generic/alertService'; 

const AuthContainer = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
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
      toast({ icon: 'success', titleKey: 'success', messageKey: 'login_success' });
      navigate('/dashboard'); 
    } catch (err) {
      setError(t('invalid_credentials'));
      errorAlert({ messageKey: 'invalid_credentials' }); 
    } finally {
      setLoading(false);
    }
  };

  return <LoginPage onLogin={handleLogin} error={error} loading={loading} />; 
};

export default AuthContainer;
