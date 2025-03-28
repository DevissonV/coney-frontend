import { jwtDecode } from 'jwt-decode';

export const jwt_Decode = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return error;
  }
};
