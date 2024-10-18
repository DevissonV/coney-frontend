import { privateAxios } from '../../utils/api/axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  const isMock = import.meta.env.VITE_REACT_APP_USE_MOCK === 'true'; 
  if (isMock) {
    return simulateLogin(credentials); 
  }

  try {
    const response = await privateAxios.post(`${API_URL}/Auths/login`, credentials);
    const { status, code, data } = response.data;

    if (!status || code !== 200) {
      throw new Error('Invalid credentials');
    }

    const { user, token } = data;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Error en login:', error);
    throw error; 
  }
};

const simulateLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'dev@pruebas.com' && credentials.password === 'pass123') {
        resolve({
          user: {
            id: 1,
            firstName: 'Devisson',
            lastName: 'Vasquez',
            email: 'dev@pruebas.com',
            role: 'user',
          },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); 
  });
};

export const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error en logout:', error);
  }
};
