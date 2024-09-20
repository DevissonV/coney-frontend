import { publicAxios } from '../../utils/api/axios'; 

const API_URL = '/static/login.json';

export const login = async (credentials) => {
  const response = await publicAxios.get(API_URL);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Invalid credentials');
  }

  
  return {
    user: data.user,
    token: data.token
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');  
};
