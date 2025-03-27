import { jwtDecode } from 'jwt-decode';

export const jwt_Decode = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};
